export class Entity<TypeProps> {
  protected props: TypeProps;

  protected constructor(props: TypeProps) {
    this.props = props;
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true;
    }

    if (JSON.stringify(this) === JSON.stringify(entity)) {
      return true;
    }

    return false;
  }
}
