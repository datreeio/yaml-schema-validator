import { css } from "@emotion/css";
import { useMemo } from "react";

type CssString = ReturnType<typeof css>;

type ClassesObject = Record<string, CssString>;

type ClassesFactory<Props extends object, Classes extends ClassesObject> = (props: Props) => Classes;

type UseClassesHook<Props extends object, Classes extends ClassesObject> = (props: Props) => Classes;

export function createUseClasses<Props extends object, Classes extends ClassesObject>(
  classesFactory: ClassesFactory<Props, Classes>,
): UseClassesHook<Props, Classes> {
  return (props: Props) => {
    return useMemo(() => classesFactory(props), [props]);
  };
}
