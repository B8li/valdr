describe('valdrUtil', function () {

  var valdrUtil;

  beforeEach(module('valdr'));
  beforeEach(inject(function (_valdrUtil_) {
    valdrUtil = _valdrUtil_;
  }));

  describe('validatorNameToToken()', function () {

    it('should convert camel case to slug case and prepend with valdr', function () {
      expect(valdrUtil.validatorNameToToken(undefined)).toBe(undefined);
      expect(valdrUtil.validatorNameToToken('nocamel')).toBe('valdr-nocamel');
      expect(valdrUtil.validatorNameToToken('camelCase')).toBe('valdr-camel-case');
      expect(valdrUtil.validatorNameToToken('CapitalCamelCase')).toBe('valdr-capital-camel-case');
    });

    it('should convert remove everything before the last dot and convert to slug case', function () {
      expect(valdrUtil.validatorNameToToken('bla.nocamel')).toBe('valdr-nocamel');
      expect(valdrUtil.validatorNameToToken('bla.camelCase')).toBe('valdr-camel-case');
      expect(valdrUtil.validatorNameToToken('bla.CapitalCamelCase')).toBe('valdr-capital-camel-case');
    });

  });

  describe('isNaN()', function () {

    it('should provide isNaN function', inject(function (valdrUtil) {
      expect(valdrUtil.isNaN).toBeDefined();
      expect(typeof valdrUtil.isNaN).toBe('function');
    }));

    it('should check if input is NaN', function () {
      expect(valdrUtil.isNaN(NaN)).toBe(true);
      expect(valdrUtil.isNaN('string')).toBe(false);
      expect(valdrUtil.isNaN(0)).toBe(false);
    });

  });

  describe('isNumber()', function () {

    it('should provide isNumber function', inject(function (valdrUtil) {
      expect(valdrUtil.isNumber).toBeDefined();
      expect(typeof valdrUtil.isNumber).toBe('function');
    }));

    it('should check if input is a number', function () {
      expect(valdrUtil.isNumber(NaN)).toBe(true);
      expect(valdrUtil.isNumber(0)).toBe(true);
      expect(valdrUtil.isNumber('string')).toBe(false);
      expect(valdrUtil.isNumber(undefined)).toBe(false);
      expect(valdrUtil.isNumber(null)).toBe(false);
    });

  });

  describe('has()', function () {

    it('should provide has function', inject(function (valdrUtil) {
      expect(valdrUtil.has).toBeDefined();
      expect(typeof valdrUtil.has).toBe('function');
    }));

    it('should check if object has property', function () {
      expect(valdrUtil.has({foo: 'a'}, 'foo')).toBe(true);
      expect(valdrUtil.has({foo: undefined}, 'foo')).toBe(true);
      expect(valdrUtil.has({}, 'foo')).toBe(false);
      expect(valdrUtil.has(undefined, 'foo')).toBe(false);
    });

  });

  describe('notEmpty()/isEmpty()', function () {

    it('should validate strings', function () {
      expect(valdrUtil.notEmpty('string')).toBe(true);
      expect(valdrUtil.isEmpty('string')).toBe(false);
    });

    it('should validate null value', function () {
      expect(valdrUtil.notEmpty(null)).toBe(false);
      expect(valdrUtil.isEmpty(null)).toBe(true);
      expect(valdrUtil.notEmpty('null')).toBe(true);
      expect(valdrUtil.isEmpty('null')).toBe(false);
    });

    it('should validate undefined value', function () {
      expect(valdrUtil.notEmpty(undefined)).toBe(false);
      expect(valdrUtil.isEmpty(undefined)).toBe(true);
    });

    it('should validate NaN value', function () {
      // NaN obviously is not a number but we don't know what it is, hence we cannot tell whether it's empty or not
      expect(valdrUtil.notEmpty(NaN)).toBe(false);
      expect(valdrUtil.isEmpty(NaN)).toBe(false);
    });

    it('should validate empty string', function () {
      expect(valdrUtil.notEmpty('')).toBe(false);
      expect(valdrUtil.isEmpty('')).toBe(true);
    });

  });

  describe('findWrappingFormGroup()', function () {

    it ('should find the parent element with class form-group', function () {
      // given
      var element = angular.element(
        '<div class="form-group">' +
          '<div>' +
            '<section>' +
              '<p></p>' +
            '</section>' +
          '</div>' +
        '</div>');
      var child = element.find('p');

      // when
      var formGroupElement = valdrUtil.findWrappingFormGroup(child);

      // then
      expect(formGroupElement.hasClass('form-group')).toBe(true);
    });

    it ('should return parent if no form-group is found', function () {
      // given
      var element = angular.element(
        '<div>' +
          '<section class="parent">' +
            '<p></p>' +
          '</section>' +
        '</div>');
      var child = element.find('p');

      // when
      var parent = valdrUtil.findWrappingFormGroup(child);

      // then
      expect(parent.hasClass('parent')).toBe(true);
    });

    it ('should return parent if no form-group is found in next 3 levels', function () {
      // given
      var element = angular.element(
        '<div class="form-group">' +
          '<div>' +
            '<div>' +
              '<div class="parent">' +
                '<p></p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>');
      var child = element.find('p');

      // when
      var parent = valdrUtil.findWrappingFormGroup(child);

      // then
      expect(parent.hasClass('parent')).toBe(true);
    });

  });

});