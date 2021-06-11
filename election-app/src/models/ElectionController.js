var ElectionController = /** @class */ (function () {
    function ElectionController(model) {
        this.model = model;
    }
    ElectionController.prototype.addParty = function (name, votes) {
        this.model.addParty(name, votes);
    };
    ElectionController.prototype.getParties = function () {
        return this.model.getAllParties();
    };
    ElectionController.prototype.clearParties = function () {
        this.model.removeAllParties();
    };
    ElectionController.prototype.saveParties = function () {
        this.model.save();
    };
    ElectionController.prototype.loadParties = function () {
        this.model.allMyParties = this.model.load();
    };
    return ElectionController;
}());
export default ElectionController;
