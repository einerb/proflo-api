import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: number) {
          if (value.toString().length > 6 && value.toString().length < 11)
            return true;
        },
      },
    });
  };
}
