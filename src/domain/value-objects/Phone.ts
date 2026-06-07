export class Phone {
  private readonly value: string

  private constructor(phone: string) {
    this.value = phone
  }

  static create(phone: string): Phone {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    if (!Phone.isValid(cleaned)) {
      throw new Error(`Invalid phone number: ${phone}`)
    }
    return new Phone(cleaned)
  }

  static isValid(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    return /^\+?\d{7,15}$/.test(cleaned)
  }

  getValue(): string {
    return this.value
  }
}
