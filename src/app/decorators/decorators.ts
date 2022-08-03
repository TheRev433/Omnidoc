import { debounce as _debounce } from 'lodash';

export const debounce = (
  milliseconds: number = 500,
  options: {
    leading: boolean;
    trailing: boolean;
  } = {
    leading: false,
    trailing: true,
  }
): MethodDecorator => {
  return function (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void | PropertyDescriptor {
    const original: any = descriptor.value;
    descriptor.value = _debounce(original, milliseconds, options);
    return descriptor;
  };
};
