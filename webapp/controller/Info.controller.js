sap.ui.define([
	"./BaseController",
	"sap/m/MessageToast"
], function(
	BaseController, MessageToast
) {
	"use strict";

	return BaseController.extend("localsap.orders.orders.controller.Info", {
		/**
		 * @override
		 */
		onInit: function() {
			// create a message manager and register the message model
			this._oMessageManager = sap.ui.getCore().getMessageManager();
			this._oMessageManager.registerObject(this.getView(), true);
			this.setModel(this._oMessageManager.getMessageModel(), "message");
			this.getRouter().getRoute("Info").attachPatternMatched(this._onInfoMatched, this);
		},
		_onInfoMatched : function (oEvent) {
			this.getModel("appView").setProperty("/layout", "ThreeColumnsMidExpanded");
		},
		_onCreateSuccess: function (oContext) {
			// show success message
			var sMessage = this.getResourceBundle().getText("newItemCreated", [oContext.ProductID]);
			MessageToast.show(sMessage, {
				closeOnBrowserNavigation : false
			});

			// navigate to the new item in display mode
			this.getRouter().navTo("Info", {
				objectId : oContext.SalesOrderID,
				itemPosition : oContext.ItemPosition
			}, true);
		},

		onCreate: function () {
			// send new item to server for processing
			this.getModel().submitChanges();
		},

		onCancel: function () {
			var sObjectId = this.getView().getBindingContext().getProperty("SalesOrderID");

			// discard the new context on cancel
			this.getModel().deleteCreatedEntry(this.oContext);

			// close the third column
			this.getRouter().navTo("object", {
				objectId : sObjectId
			}, true);
		},

		onNameChange: function () {
			// clear potential server-side messages to allow saving the item again
			this._oMessageManager.getMessageModel().getData().forEach(function(oMessage){
				if (oMessage.code) {
					this._oMessageManager.removeMessages(oMessage);
				}
			}.bind(this));
		},

		onOpenMessages: function (oEvent) {
			this.byId("messages").openBy(oEvent.getSource());
		}
	});
});