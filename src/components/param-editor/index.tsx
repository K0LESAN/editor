import { type FC, useCallback, useState } from 'react';

interface Color {
  value: string;
}

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: FC<Props> = ({ model, params }) => {
  const [paramValues, setParamValues] = useState(model.paramValues || []);

  const handleChange = (paramId: number, newValue: string) => {
    const updatedParamValues = paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { paramId, value: newValue };
      }

      return paramValue;
    });

    setParamValues(updatedParamValues);
  };

  const clickHandler = useCallback(() => {
    console.log({
      paramValues,
      colors: [],
    });
  }, [paramValues]);

  return (
    <div>
      {params.map((p) => {
        const currentValue =
          paramValues.find((pv) => pv.paramId === p.id)?.value || '';

        return (
          <div key={p.id}>
            <label>{p.name}: </label>
            <input
              type='text'
              value={currentValue}
              onChange={(event) => handleChange(p.id, event.target.value)}
            />
          </div>
        );
      })}
      <button onClick={clickHandler}>Получить модель (вывод в консоли)</button>
    </div>
  );
};

export default ParamEditor;
