"use client";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
export default function () {
  return (
    <Card
      title={"dummy"}
      children={
        <Center
          children={
            <Select
              onSelect={display}
              options={[
                { key: "1", value: "fun1" },
                { key: "2", value: "fun2" },
              ]}
            ></Select>
          }
        ></Center>
      }
    />
  );
}

const display = (value: string): void => {
  console.log(value);
};
