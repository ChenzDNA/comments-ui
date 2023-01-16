export class ContentType<R> {
  public static APPLICATION_JSON: ContentType<string> = new ContentType('application/json;charset=utf8', (data: any) => {
    return JSON.stringify(data)
  })
  public static FORM_DATA: ContentType<FormData> = new ContentType('multipart/form-data', (data: any) => {
    const res = new FormData();
    for (let i of Object.keys(data)) {
      res.append(i, data[i])
    }
    return res
  })
  public value: string
  public resolve: (a: any) => R

  constructor(value: string, resolve: (a: any) => R) {
    this.value = value
    this.resolve = resolve
  }
}
