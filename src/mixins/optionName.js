export const optionName = {
  methods: {
    optionName(option) {
      return Object.prototype.hasOwnProperty.call(option, 'name')
        ? option.name
        : option.firstName + " " + option.lastName;
    },
  }
}