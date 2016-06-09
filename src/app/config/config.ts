export class Config {
    public static get EMAIL_PATTERN() : RegExp { return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  }
    public static get MIN_PASSWORD_LENGTH(): number { return 6;  }
    public static get MIN_NAME_LENGTH(): number { return 2;  }
}
