"use client";

import { memo } from "react";
import isEqual from "react-fast-compare";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  mobileMenuStoreActions,
  // useMobileMenuModalStore,
  // useMobileMenuStoreGetter,
} from "@/store/use-modal-store";

import { DEFAULT_SEARCH_FORM_VALUE, formSchema } from "./schema";

function DemoForm() {
  // const isOpeningMobileMenu = useMobileMenuStoreGetter('isOpen')
  // const isOpeningMobileMenu = useMobileMenuModalStore((state) => state.isOpen)
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: DEFAULT_SEARCH_FORM_VALUE,
  });

  const onSubmit = (values: yup.InferType<typeof formSchema>) => {
    console.log(values); // eslint-disable-line
    console.log("%c => value ", "background: #0095FF; color: #fff"); // eslint-disable-line
    console.log(new Date()); // eslint-disable-line
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-gray-outline flex h-12 w-full items-center"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="h-full flex-1 space-y-0 border-none">
              <FormControl>
                <Input
                  placeholder="Hello"
                  {...field}
                  className="!border-gray-outline !text-gray-placeholder !placeholder-gray-placeholder focus:!border-blue-light focus:!ring-blue-light !h-full !rounded-none !rounded-bl-[1px] !rounded-tl-[1px] !border-solid !bg-transparent focus:!outline-none focus:!ring-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="gradient-bg h-full rounded-none rounded-br-[1px] rounded-tr-[1px] px-8 py-4"
        >
          Submit
        </Button>
        <Button
          className="gradient-bg h-full rounded-none rounded-br-[1px] rounded-tr-[1px] px-8 py-4"
          onClick={mobileMenuStoreActions.openModal}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default memo(DemoForm, isEqual);
