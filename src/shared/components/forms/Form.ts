export class Form {
  constructor(fields: Record<string, boolean>) {
    this.fields = fields;
  }

  private fields: Record<string, boolean>;

  SetValidity(name: string, isValid: boolean) {
    let oldState;
    if (this.onValidityChanged) {
      oldState = this.isValid;
    }
    this.fields[name] = isValid;
    if (this.onValidityChanged) {
      const newstate = this.isValid;
      if (oldState !== newstate) this.onValidityChanged(newstate);
    }
  }

  get isValid() {
    // eslint-disable-next-line no-restricted-syntax
    for (const fieldname in this.fields) {
      if (!this.fields[fieldname]) {
        return false;
      }
    }
    return true;
  }

  onValidityChanged?: (isValid: boolean) => void;
}
