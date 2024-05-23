import { OptionsObject } from "notistack";

interface VariantProps extends OptionsObject {
  variant: "error" | "warning" | "success" | "info" | "default";
}

export const errorVariant: VariantProps = {
  variant: "error",
};

export const warningVariant: VariantProps = {
  variant: "warning",
};

export const successVariant: VariantProps = {
  variant: "success",
};

export const infoVariant: VariantProps = {
  variant: "info",
};

export const defaultVariant: VariantProps = {
  variant: "default",
};
