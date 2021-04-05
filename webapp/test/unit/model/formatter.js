/*global QUnit*/

sap.ui.define([
	"sap/m/Text",
	"localsap/orders/orders/model/formatter"
], function (Text, formatter) {
	"use strict";

	QUnit.module("formatter - Currency value");

	function currencyValueTestCase(assert, sValue, fExpectedNumber) {
		// Act
		var fCurrency = formatter.currencyValue(sValue);

		// Assert
		assert.strictEqual(fCurrency, fExpectedNumber, "The rounding was correct");
	}

	QUnit.test("Should round down a 3 digit number", function (assert) {
		currencyValueTestCase.call(this, assert, "3.123", "$3.12");
	});

	QUnit.test("Should round up a 3 digit number", function (assert) {
		currencyValueTestCase.call(this, assert, "3.128", "$3.13");
	});

	QUnit.test("Should round a negative number", function (assert) {
		currencyValueTestCase.call(this, assert, "-3", "$-3.00");
	});

	QUnit.test("Should round an empty string", function (assert) {
		currencyValueTestCase.call(this, assert, "", "$0.00");
	});

	QUnit.test("Should round a zero", function (assert) {
		currencyValueTestCase.call(this, assert, "0", "$0.00");
	});

	QUnit.module("formatter - Discount value");

	function discountValueTestCase(assert, sValue, fExpectedNumber){
		//Act
		var fDiscount = formatter.discountValue(sValue);

		//Assert
		assert.strictEqual(fDiscount, fExpectedNumber, "The dicound was fixed");
	}

	QUnit.test("Shoud return 0 %", function (assert){
		discountValueTestCase.call(this, assert, "0", "0 %");
	});

	QUnit.test("Shoud return 1 %", function (assert){
		discountValueTestCase.call(this, assert, "0.01", "1 %");
	});

	QUnit.test("Shoud return 15 %", function (assert){
		discountValueTestCase.call(this, assert, "0.15", "15 %");
	});

	QUnit.test("Shoud return 37.52 %", function (assert){
		discountValueTestCase.call(this, assert, "0.3752", "37.52 %");
	});

	QUnit.test("Shoud return 1.99 %", function (assert){
		discountValueTestCase.call(this, assert, "0.01999999", "1.999999 %");
	});
});