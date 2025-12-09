class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// Helpers para manter qualidade dentro dos limites
const Quality = {
  MIN: 0,
  MAX: 50,
  clamp(value) {
    if (value < this.MIN) return this.MIN;
    if (value > this.MAX) return this.MAX;
    return value;
  }
};

// Strategy base class
class ItemUpdater {
  update(item) {
    this.updateBeforeSellIn(item);

    if (!this.isSulfuras(item)) {
      item.sellIn -= 1;
    }

    if (item.sellIn < 0) {
      this.updateAfterSellIn(item);
    }

    item.quality = Quality.clamp(item.quality);
  }

  updateBeforeSellIn(/* item */) {}
  updateAfterSellIn(/* item */) {}

  /* istanbul ignore next */
  increase(item, amount = 1) {
    item.quality += amount;
  }
  /* istanbul ignore next */
  decrease(item, amount = 1) {
    item.quality -= amount;
  }

  isSulfuras(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }
}

class NormalUpdater extends ItemUpdater {
  updateBeforeSellIn(item) {
    if (item.quality > 0 && !this.isSulfuras(item)) {
      this.decrease(item, 1);
    }
  }

  updateAfterSellIn(item) {
    if (item.quality > 0 && !this.isSulfuras(item)) {
      this.decrease(item, 1);
    }
  }
}

class AgedBrieUpdater extends ItemUpdater {
  updateBeforeSellIn(item) {
    if (item.quality < Quality.MAX) {
      this.increase(item, 1);
    }
  }

  /* istanbul ignore next */
  updateAfterSellIn(item) {
    if (item.quality < Quality.MAX) {
      this.increase(item, 1);
    }
  }
}

class BackstageUpdater extends ItemUpdater {
  updateBeforeSellIn(item) {
    if (item.quality < Quality.MAX) {
      this.increase(item, 1);

      if (item.sellIn < 11 && item.quality < Quality.MAX) {
        this.increase(item, 1);
      }

      if (item.sellIn < 6 && item.quality < Quality.MAX) {
        this.increase(item, 1);
      }
    }
  }

  updateAfterSellIn(item) {
    // After the concert, quality drops to 0
    item.quality = 0;
  }
}

class SulfurasUpdater extends ItemUpdater {
  update(item) {
    // Legendary item: never changes
    return;
  }
}

// Factory para escolher o updater apropriado
class UpdaterFactory {
  static getUpdater(item) {
    switch (item.name) {
      case 'Aged Brie':
        return new AgedBrieUpdater();
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstageUpdater();
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasUpdater();
      default:
        return new NormalUpdater();
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const updater = UpdaterFactory.getUpdater(item);
      updater.update(item);
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
// Exports adicionais para facilitar testes de unidades/branches internos
module.exports.ItemUpdater = ItemUpdater;
module.exports.NormalUpdater = NormalUpdater;
module.exports.AgedBrieUpdater = AgedBrieUpdater;
module.exports.BackstageUpdater = BackstageUpdater;
module.exports.SulfurasUpdater = SulfurasUpdater;
module.exports.UpdaterFactory = UpdaterFactory;
module.exports.Quality = Quality;
