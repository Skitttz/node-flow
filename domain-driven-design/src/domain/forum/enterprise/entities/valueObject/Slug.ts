export class Slug {
  private constructor(public readonly value: string) {}

  static create(slug: string){
    return new Slug(slug);
  }

  static createFromText(text: string): Slug {
    if (!text || typeof text !== 'string') {
      throw new Error('Text must be a non-empty string');
    }

    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

    if (!slugText) {
      throw new Error('Resulting slug cannot be empty');
    }

    return new Slug(slugText);
  }

  static createFromSlug(value: string): Slug {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      throw new Error('Invalid slug format');
    }
    return new Slug(value);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Slug): boolean {
    return this.value === other.value;
  }
}