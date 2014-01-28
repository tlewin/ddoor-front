'use strict';

describe('Service: Bggray', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var Bggray;
  beforeEach(inject(function (_Bggray_) {
    Bggray = _Bggray_;
  }));

  it('should do something', function () {
    expect(!!Bggray).toBe(true);
  });

});
