// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
class Item {
  constructor(name, sellIn, quality) {
    if (stryMutAct_9fa48("0")) {
      {}
    } else {
      stryCov_9fa48("0");
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
  }
}

// Helpers para manter qualidade dentro dos limites
const Quality = stryMutAct_9fa48("1") ? {} : (stryCov_9fa48("1"), {
  MIN: 0,
  MAX: 50,
  clamp(value) {
    if (stryMutAct_9fa48("2")) {
      {}
    } else {
      stryCov_9fa48("2");
      if (stryMutAct_9fa48("6") ? value >= this.MIN : stryMutAct_9fa48("5") ? value <= this.MIN : stryMutAct_9fa48("4") ? false : stryMutAct_9fa48("3") ? true : (stryCov_9fa48("3", "4", "5", "6"), value < this.MIN)) return this.MIN;
      if (stryMutAct_9fa48("10") ? value <= this.MAX : stryMutAct_9fa48("9") ? value >= this.MAX : stryMutAct_9fa48("8") ? false : stryMutAct_9fa48("7") ? true : (stryCov_9fa48("7", "8", "9", "10"), value > this.MAX)) return this.MAX;
      return value;
    }
  }
});

// Strategy base class
class ItemUpdater {
  update(item) {
    if (stryMutAct_9fa48("11")) {
      {}
    } else {
      stryCov_9fa48("11");
      this.updateBeforeSellIn(item);
      if (stryMutAct_9fa48("14") ? false : stryMutAct_9fa48("13") ? true : stryMutAct_9fa48("12") ? this.isSulfuras(item) : (stryCov_9fa48("12", "13", "14"), !this.isSulfuras(item))) {
        if (stryMutAct_9fa48("15")) {
          {}
        } else {
          stryCov_9fa48("15");
          stryMutAct_9fa48("16") ? item.sellIn += 1 : (stryCov_9fa48("16"), item.sellIn -= 1);
        }
      }
      if (stryMutAct_9fa48("20") ? item.sellIn >= 0 : stryMutAct_9fa48("19") ? item.sellIn <= 0 : stryMutAct_9fa48("18") ? false : stryMutAct_9fa48("17") ? true : (stryCov_9fa48("17", "18", "19", "20"), item.sellIn < 0)) {
        if (stryMutAct_9fa48("21")) {
          {}
        } else {
          stryCov_9fa48("21");
          this.updateAfterSellIn(item);
        }
      }
      item.quality = Quality.clamp(item.quality);
    }
  }
  updateBeforeSellIn(/* item */) {}
  updateAfterSellIn(/* item */) {}

  /* istanbul ignore next */
  increase(item, amount = 1) {
    if (stryMutAct_9fa48("22")) {
      {}
    } else {
      stryCov_9fa48("22");
      stryMutAct_9fa48("23") ? item.quality -= amount : (stryCov_9fa48("23"), item.quality += amount);
    }
  }
  /* istanbul ignore next */
  decrease(item, amount = 1) {
    if (stryMutAct_9fa48("24")) {
      {}
    } else {
      stryCov_9fa48("24");
      stryMutAct_9fa48("25") ? item.quality += amount : (stryCov_9fa48("25"), item.quality -= amount);
    }
  }
  isSulfuras(item) {
    if (stryMutAct_9fa48("26")) {
      {}
    } else {
      stryCov_9fa48("26");
      return stryMutAct_9fa48("29") ? item.name !== 'Sulfuras, Hand of Ragnaros' : stryMutAct_9fa48("28") ? false : stryMutAct_9fa48("27") ? true : (stryCov_9fa48("27", "28", "29"), item.name === (stryMutAct_9fa48("30") ? "" : (stryCov_9fa48("30"), 'Sulfuras, Hand of Ragnaros')));
    }
  }
}
class NormalUpdater extends ItemUpdater {
  updateBeforeSellIn(item) {
    if (stryMutAct_9fa48("31")) {
      {}
    } else {
      stryCov_9fa48("31");
      if (stryMutAct_9fa48("34") ? item.quality > 0 || !this.isSulfuras(item) : stryMutAct_9fa48("33") ? false : stryMutAct_9fa48("32") ? true : (stryCov_9fa48("32", "33", "34"), (stryMutAct_9fa48("37") ? item.quality <= 0 : stryMutAct_9fa48("36") ? item.quality >= 0 : stryMutAct_9fa48("35") ? true : (stryCov_9fa48("35", "36", "37"), item.quality > 0)) && (stryMutAct_9fa48("38") ? this.isSulfuras(item) : (stryCov_9fa48("38"), !this.isSulfuras(item))))) {
        if (stryMutAct_9fa48("39")) {
          {}
        } else {
          stryCov_9fa48("39");
          this.decrease(item, 1);
        }
      }
    }
  }
  updateAfterSellIn(item) {
    if (stryMutAct_9fa48("40")) {
      {}
    } else {
      stryCov_9fa48("40");
      if (stryMutAct_9fa48("43") ? item.quality > 0 || !this.isSulfuras(item) : stryMutAct_9fa48("42") ? false : stryMutAct_9fa48("41") ? true : (stryCov_9fa48("41", "42", "43"), (stryMutAct_9fa48("46") ? item.quality <= 0 : stryMutAct_9fa48("45") ? item.quality >= 0 : stryMutAct_9fa48("44") ? true : (stryCov_9fa48("44", "45", "46"), item.quality > 0)) && (stryMutAct_9fa48("47") ? this.isSulfuras(item) : (stryCov_9fa48("47"), !this.isSulfuras(item))))) {
        if (stryMutAct_9fa48("48")) {
          {}
        } else {
          stryCov_9fa48("48");
          this.decrease(item, 1);
        }
      }
    }
  }
}
class AgedBrieUpdater extends ItemUpdater {
  updateBeforeSellIn(item) {
    if (stryMutAct_9fa48("49")) {
      {}
    } else {
      stryCov_9fa48("49");
      if (stryMutAct_9fa48("53") ? item.quality >= Quality.MAX : stryMutAct_9fa48("52") ? item.quality <= Quality.MAX : stryMutAct_9fa48("51") ? false : stryMutAct_9fa48("50") ? true : (stryCov_9fa48("50", "51", "52", "53"), item.quality < Quality.MAX)) {
        if (stryMutAct_9fa48("54")) {
          {}
        } else {
          stryCov_9fa48("54");
          this.increase(item, 1);
        }
      }
    }
  }

  /* istanbul ignore next */
  updateAfterSellIn(item) {
    if (stryMutAct_9fa48("55")) {
      {}
    } else {
      stryCov_9fa48("55");
      if (stryMutAct_9fa48("59") ? item.quality >= Quality.MAX : stryMutAct_9fa48("58") ? item.quality <= Quality.MAX : stryMutAct_9fa48("57") ? false : stryMutAct_9fa48("56") ? true : (stryCov_9fa48("56", "57", "58", "59"), item.quality < Quality.MAX)) {
        if (stryMutAct_9fa48("60")) {
          {}
        } else {
          stryCov_9fa48("60");
          this.increase(item, 1);
        }
      }
    }
  }
}
class BackstageUpdater extends ItemUpdater {
  updateBeforeSellIn(item) {
    if (stryMutAct_9fa48("61")) {
      {}
    } else {
      stryCov_9fa48("61");
      if (stryMutAct_9fa48("65") ? item.quality >= Quality.MAX : stryMutAct_9fa48("64") ? item.quality <= Quality.MAX : stryMutAct_9fa48("63") ? false : stryMutAct_9fa48("62") ? true : (stryCov_9fa48("62", "63", "64", "65"), item.quality < Quality.MAX)) {
        if (stryMutAct_9fa48("66")) {
          {}
        } else {
          stryCov_9fa48("66");
          this.increase(item, 1);
          if (stryMutAct_9fa48("69") ? item.sellIn < 11 || item.quality < Quality.MAX : stryMutAct_9fa48("68") ? false : stryMutAct_9fa48("67") ? true : (stryCov_9fa48("67", "68", "69"), (stryMutAct_9fa48("72") ? item.sellIn >= 11 : stryMutAct_9fa48("71") ? item.sellIn <= 11 : stryMutAct_9fa48("70") ? true : (stryCov_9fa48("70", "71", "72"), item.sellIn < 11)) && (stryMutAct_9fa48("75") ? item.quality >= Quality.MAX : stryMutAct_9fa48("74") ? item.quality <= Quality.MAX : stryMutAct_9fa48("73") ? true : (stryCov_9fa48("73", "74", "75"), item.quality < Quality.MAX)))) {
            if (stryMutAct_9fa48("76")) {
              {}
            } else {
              stryCov_9fa48("76");
              this.increase(item, 1);
            }
          }
          if (stryMutAct_9fa48("79") ? item.sellIn < 6 || item.quality < Quality.MAX : stryMutAct_9fa48("78") ? false : stryMutAct_9fa48("77") ? true : (stryCov_9fa48("77", "78", "79"), (stryMutAct_9fa48("82") ? item.sellIn >= 6 : stryMutAct_9fa48("81") ? item.sellIn <= 6 : stryMutAct_9fa48("80") ? true : (stryCov_9fa48("80", "81", "82"), item.sellIn < 6)) && (stryMutAct_9fa48("85") ? item.quality >= Quality.MAX : stryMutAct_9fa48("84") ? item.quality <= Quality.MAX : stryMutAct_9fa48("83") ? true : (stryCov_9fa48("83", "84", "85"), item.quality < Quality.MAX)))) {
            if (stryMutAct_9fa48("86")) {
              {}
            } else {
              stryCov_9fa48("86");
              this.increase(item, 1);
            }
          }
        }
      }
    }
  }
  updateAfterSellIn(item) {
    if (stryMutAct_9fa48("87")) {
      {}
    } else {
      stryCov_9fa48("87");
      // After the concert, quality drops to 0
      item.quality = 0;
    }
  }
}
class SulfurasUpdater extends ItemUpdater {
  update(item) {
    if (stryMutAct_9fa48("88")) {
      {}
    } else {
      stryCov_9fa48("88");
      // Legendary item: never changes
      return;
    }
  }
}

// Factory para escolher o updater apropriado
class UpdaterFactory {
  static getUpdater(item) {
    if (stryMutAct_9fa48("89")) {
      {}
    } else {
      stryCov_9fa48("89");
      switch (item.name) {
        case stryMutAct_9fa48("91") ? "" : (stryCov_9fa48("91"), 'Aged Brie'):
          if (stryMutAct_9fa48("90")) {} else {
            stryCov_9fa48("90");
            return new AgedBrieUpdater();
          }
        case stryMutAct_9fa48("93") ? "" : (stryCov_9fa48("93"), 'Backstage passes to a TAFKAL80ETC concert'):
          if (stryMutAct_9fa48("92")) {} else {
            stryCov_9fa48("92");
            return new BackstageUpdater();
          }
        case stryMutAct_9fa48("95") ? "" : (stryCov_9fa48("95"), 'Sulfuras, Hand of Ragnaros'):
          if (stryMutAct_9fa48("94")) {} else {
            stryCov_9fa48("94");
            return new SulfurasUpdater();
          }
        default:
          if (stryMutAct_9fa48("96")) {} else {
            stryCov_9fa48("96");
            return new NormalUpdater();
          }
      }
    }
  }
}
class Shop {
  constructor(items = stryMutAct_9fa48("97") ? ["Stryker was here"] : (stryCov_9fa48("97"), [])) {
    if (stryMutAct_9fa48("98")) {
      {}
    } else {
      stryCov_9fa48("98");
      this.items = items;
    }
  }
  updateQuality() {
    if (stryMutAct_9fa48("99")) {
      {}
    } else {
      stryCov_9fa48("99");
      for (let i = 0; stryMutAct_9fa48("102") ? i >= this.items.length : stryMutAct_9fa48("101") ? i <= this.items.length : stryMutAct_9fa48("100") ? false : (stryCov_9fa48("100", "101", "102"), i < this.items.length); stryMutAct_9fa48("103") ? i-- : (stryCov_9fa48("103"), i++)) {
        if (stryMutAct_9fa48("104")) {
          {}
        } else {
          stryCov_9fa48("104");
          const item = this.items[i];
          const updater = UpdaterFactory.getUpdater(item);
          updater.update(item);
        }
      }
      return this.items;
    }
  }
}
module.exports = stryMutAct_9fa48("105") ? {} : (stryCov_9fa48("105"), {
  Item,
  Shop
});
// Exports adicionais para facilitar testes de unidades/branches internos
module.exports.ItemUpdater = ItemUpdater;
module.exports.NormalUpdater = NormalUpdater;
module.exports.AgedBrieUpdater = AgedBrieUpdater;
module.exports.BackstageUpdater = BackstageUpdater;
module.exports.SulfurasUpdater = SulfurasUpdater;
module.exports.UpdaterFactory = UpdaterFactory;
module.exports.Quality = Quality;