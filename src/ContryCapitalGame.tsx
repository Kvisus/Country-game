import { useState } from "react";

type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  state: ButtonState;
};

function randomize() {
  return Math.random() - 0.5;
}

export default function ContryCapitalGame({
  data,
}: {
  data: Record<string, string>;
}) {
  const [options, setOptions] = useState<Option[]>(
    [...Object.keys(data), ...Object.values(data)]
      .sort(randomize)
      .map((value) => ({
        value,
        state: "DEFAULT",
      }))
  );

  const [selected, setSelected] = useState<Option>();
  const isGameOver = options.length === 0;

  if (isGameOver) {
    return <div>Congraz!</div>;
  }

  return (
    <>
      {options.map((option) => (
        <button
          key={option.value}
          className={
            option.state === "SELECTED"
              ? "selected"
              : option.state === "WRONG"
              ? "wrong"
              : ""
          }
          onClick={() => {
            if (!selected) {

              setSelected(option);
              setOptions(
                options.map((opt) => {
                  return opt === option
                    ? {
                        ...opt,
                        state: "SELECTED",
                      }
                    : { ...opt, state: "DEFAULT" };
                })
              );
            } else {
              if (
                selected.value === data[option.value] ||
                data[selected.value] === option.value
              ) {
                setOptions(
                  options.filter((opt) => {
                    return !(
                      opt.value === selected.value || opt.value === option.value
                    );
                  })
                );
              } else {
                //wrong pair
                setOptions(
                  options.map((opt) => {
                    return opt.value === selected.value ||
                      opt.value === option.value
                      ? { ...opt, state: "WRONG" }
                      : opt;
                  })
                );
              }
              setSelected(undefined);
            }
          }}
        >
          {option.value}
        </button>
      ))}
    </>
  );
}
