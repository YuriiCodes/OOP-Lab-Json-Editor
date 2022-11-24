import {XMLParser} from "fast-xml-parser";

// Implement singleton pattern
export class XmlParserClass {
    private static instance: XMLParser;
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
    private constructor() { }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
    public static getInstance(): XmlParserClass {
        if (!XmlParserClass.instance) {
            XmlParserClass.instance = new XMLParser();
        }
        return XmlParserClass.instance;
    }
  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
    public parse(xml: string): string {
        return XmlParserClass.instance.parse(xml);
    }
}
