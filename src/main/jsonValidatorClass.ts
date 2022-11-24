import {Validator} from 'jsonschema';


// implemnt Singleton pattern to avoid multiple instances of Validator
export class JsonValidatorClass {
  private static instance: JsonValidatorClass;
  private validator: Validator;

  private constructor() {
    this.validator = new Validator();
  }

  public static getInstance(): JsonValidatorClass {
    if (!JsonValidatorClass.instance) {
      JsonValidatorClass.instance = new JsonValidatorClass();
    }

    return JsonValidatorClass.instance;
  }

  public validate(json: string, schema: any): boolean {
    let result = this.validator.validate(JSON.parse(json), schema);
    return result.valid;
  }
}
