require("async");

let constants = sails.config.constants;

module.exports = {
  vitamins: [],
  rods: {
    0: [],
    1: [],
    2: []
  },
  callStack: [],

  processVitamins: function (data, next) {
    // '3G 4G 5B 6G 7W 8B'  '3G 4B 5B 6G 7W 8B'
    async.each(data.vitamins.split(" "), function (vitamin, callback) {
      let weight = vitamin.match(/\d+/) ? vitamin.match(/\d+/)[0] : 0,
        color = vitamin.replace(weight, '');
      if (!module.exports.validateInput(weight, color)) {
        callback(true);
      }
      else {
        module.exports.vitamins.push({
          size: parseInt(weight),
          rod: constants[color],
          label: color
        });
        module.exports.rods[constants[color]].push(weight);
        callback();
      }
    }, function (err) {
      if (err) {
        next('invalid input');
      }
      else {
        module.exports.makeAllWhite(module.exports.vitamins.length - 1, module.exports.vitamins, module.exports.rods, []);
        module.exports.addVitaminRequest({request: data.vitamins, actions: module.exports.callStack}, function(item) {
          module.exports.clearData();
          next(item);
        });
      }
    });
  },

  makeAllWhite: function (index, vitamins, rods, subTower) {
    let currentVitamin = vitamins[index],
      nextVitamin = vitamins[index - 1];
    subTower.push(currentVitamin);

    if (currentVitamin.rod !== nextVitamin.rod && index > 1) {
      module.exports.Hanoi(subTower.length, index, currentVitamin.rod, nextVitamin.rod, module.exports.getAssistingRod(currentVitamin.rod + nextVitamin.rod));
    }

    index--;

    if (index > 0) {
      module.exports.makeAllWhite(index, vitamins, rods, subTower);
    }
    else {
      subTower.push(nextVitamin);
      module.exports.vitamins = vitamins;

      if (vitamins[1].rod !== constants['W'] && rods[vitamins[0].rod].length === 1) {
        module.exports.Hanoi(1, 0, vitamins[0].rod, constants['W'], vitamins[1].rod);
        module.exports.Hanoi(subTower.length - 1, 1, vitamins[1].rod, constants['W'], module.exports.getAssistingRod(vitamins[1].rod + constants['W']));
      }
      else {
        module.exports.Hanoi(vitamins.length, 0, vitamins[0].rod, constants['W'], module.exports.getAssistingRod(vitamins[0].rod + constants['W']));
      }
    }

  },

  Hanoi: function (n, index, from, to, via) {
    if (n == 0) return;

    module.exports.Hanoi(n - 1, index + 1, from, via, to);

    // console.log('!disk ' + module.exports.vitamins[index].size + ' from ' + from + ' to ' + to);
    module.exports.callStack.push([module.exports.vitamins[index].size, constants[from], constants[to]]);
    module.exports.vitamins[index].rod = to;
    module.exports.vitamins[index].label = constants[to];

    let rodIndex = module.exports.rods[from].indexOf(module.exports.vitamins[index].size);
    module.exports.rods[from].splice(rodIndex, 1);
    if (module.exports.rods[to].length) {
      module.exports.rods[to].unshift(module.exports.vitamins[index].size);
    }
    else {
      module.exports.rods[to].push(module.exports.vitamins[index].size);
    }


    module.exports.Hanoi(n - 1, index + 1, via, to, from);
  },

  // TODO - move it into a policy!!! fix 2 digit number validation
  validateInput: function (weight, color) {
    if (isNaN(weight)  || parseInt(weight) < constants.minWeight) {
      return false;
    }
    else if (color.length > 1 || constants[color] === undefined) {
      return false;
    }
    else {
      return true;
    }
  },

  getAssistingRod: function (sum) {
    switch (sum) {
      case 1:
        return 2;
        break;
      case 2:
        return 1;
        break;
      case 3:
        return 0;
        break;
    }
  },

  clearData: function() {
    module.exports.vitamins = [];
    module.exports.rods = {
      0: [],
      1: [],
      2: []
    };
    module.exports.callStack = [];
  },

  addVitaminRequest: function (data, next) {
    VitaminRequest.create({
      request: data.request,
      actions: data.actions
    }).exec(function (err, request) {
      if (err) throw err;
      next(request);
    });
  },

  getVitaminRequests: function(next) {
    VitaminRequest.find().exec(function(err, items) {
      if(err) throw err;
      next(items);
    });
  },

  findVitaminsRequest: function(filter, next) {
    VitaminRequest.findOne(filter).exec(function(err, items) {
      if(err) throw err;
      next(items);
    });
  }
};

