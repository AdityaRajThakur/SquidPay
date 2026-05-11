"use client";
import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import createOnrampTransaction from "../app/lib/actions/createOnrampTransaction";
const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];
export function AddMoneyCard(): JSX.Element {
  const [redirectUrl, setRedirectUrl] = useState<string[]>(
    SUPPORTED_BANKS.map((value) => {
      return value.redirectUrl;
    }),
  );
  const [amount, setAmount] = useState<number>(0);
  const [provider, setProvider] = useState<string>("");
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(amt) => {
            setAmount(Number(amt));
          }}
        ></TextInput>
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(prd) => {
            setProvider(prd);
            //console.log(e) ;
          }}
          options={SUPPORTED_BANKS.map((value) => ({
            key: value.name,
            value: value.name,
          }))}
        ></Select>
        <Center>
          <Button
            onClick={() => {
              createOnrampTransaction({ provider, amount });
              // console.log(provider + " " + amount) ;
              window.location.href = "";
            }}
          >
            <div>Add Money</div>
          </Button>
        </Center>
      </div>
    </Card>
  );
}
