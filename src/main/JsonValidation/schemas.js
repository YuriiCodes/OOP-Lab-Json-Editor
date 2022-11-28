const validJsonObj = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "department": {
      "type": "string"
    },
    "branch": {
      "type": "string"
    },
    "chair": {
      "type": "string"
    },
    "day": {
      "type": "string"
    },
    "time": {
      "type": "string"
    },
    "headman": {
      "type": "string"
    },
    "course": {
      "type": "string"
    },
    "subject": {
      "type": "string"
    },
    "leader": {
      "type": "string"
    }
  },
  required: ["name", "department", "branch", "chair", "day", "time", "headman", "course", "subject", "leader"]
}
export const validConcreteJsonSchema = {
  "type": "array",
  "items" : validJsonObj
}

