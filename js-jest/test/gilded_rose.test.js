const lib = require("../src/gilded_rose");
const { Shop, Item } = lib;

describe("Gilded Rose - comprehensive suite", () => {
  test("Item constructor sets properties", () => {
    const it = new Item("foo", 10, 20);
    expect(it.name).toBe("foo");
    expect(it.sellIn).toBe(10);
    expect(it.quality).toBe(20);
  });

  test("updateQuality returns the same items array instance", () => {
    const items = [new Item("foo", 1, 1)];
    const shop = new Shop(items);
    const returned = shop.updateQuality();
    expect(returned).toBe(items);
  });

  describe("Normal items", () => {
    test("quality and sellIn decrease by 1 before sell date", () => {
      const item = new Item("foo", 5, 10);
      const shop = new Shop([item]);
      shop.updateQuality();
      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(9);
    });

    test("quality degrades twice after sell date", () => {
      const item = new Item("foo", 0, 10);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(-1);
      // decreased once before sellIn and once after => -2
      expect(item.quality).toBe(8);
    });

    test("quality never goes below 0", () => {
      const item = new Item("foo", 5, 0);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(0);
    });

    test("negative initial quality is clamped to 0 after update", () => {
      const item = new Item("foo", 5, -10);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(0);
    });
  });

  describe("Aged Brie", () => {
    test("increases in quality before sell date", () => {
      const item = new Item("Aged Brie", 2, 0);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(1);
      expect(item.quality).toBe(1);
    });

    test("increases twice in quality after sell date", () => {
      const item = new Item("Aged Brie", 0, 0);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(2);
    });

    test("quality never exceeds 50", () => {
      const item = new Item("Aged Brie", 5, 50);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(50);
    });

    test("initial quality above 50 is clamped down to 50 after update", () => {
      const item = new Item("Aged Brie", 5, 55);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(50);
    });
  });

  describe("Backstage passes", () => {
    test("increases by 1 when sellIn > 10", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(14);
      expect(item.quality).toBe(21);
    });

    test("increases by 2 when 6 <= sellIn <= 10", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(22);
    });

    test("increases by 3 when 0 <= sellIn <= 5", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(23);
    });

    test("quality drops to 0 after the concert", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });

    test("quality does not exceed 50 when multiple increases would overflow", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49);
      new Shop([item]).updateQuality();
      // increase by 1 -> 50, subsequent checks must not push above 50
      expect(item.quality).toBe(50);
    });
  });

  describe("Sulfuras", () => {
    test("never changes quality or sellIn", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 5, 80);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(5);
      expect(item.quality).toBe(80);
    });
  });

  test("multiple items are processed independently", () => {
    const items = [
      new Item("foo", 1, 1),
      new Item("Aged Brie", 1, 1),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1),
      new Item("Sulfuras, Hand of Ragnaros", 1, 80)
    ];
    new Shop(items).updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(2); // aged brie +1 then +1 after sell
    expect(items[2].quality).toBe(4); // backstage (sellIn 1 => +4 before decrement)
    expect(items[3].quality).toBe(80); // sulfuras unchanged
  });

  describe("internal updaters and edge branches", () => {
    test("ItemUpdater.update respects isSulfuras branch (no decrement)", () => {
      const base = new lib.ItemUpdater();
      const sulf = new Item('Sulfuras, Hand of Ragnaros', 5, 10);
      base.update(sulf);
      // no decrement because isSulfuras is true
      expect(sulf.sellIn).toBe(5);
      // clamp applied
      expect(sulf.quality).toBe(10);

      const normal = new Item('foo', 2, 3);
      base.update(normal);
      expect(normal.sellIn).toBe(1);
      expect(normal.quality).toBe(3);
    });

    test("increase and decrease helpers mutate quality correctly", () => {
      const up = new lib.ItemUpdater();
      const it = new Item('x', 1, 5);
      up.increase(it, 2);
      expect(it.quality).toBe(7);
      up.decrease(it, 3);
      expect(it.quality).toBe(4);
    });

    test("NormalUpdater.updateAfterSellIn does not decrease below 0 (branch)", () => {
      const normal = new lib.NormalUpdater();
      const itemZero = new Item('foo', 0, 0);
      // call base update to exercise updateAfterSellIn path
      normal.update(itemZero);
      // sellIn decremented to -1, quality stays 0 (no negative)
      expect(itemZero.sellIn).toBe(-1);
      expect(itemZero.quality).toBe(0);

      const itemPositive = new Item('foo', 0, 2);
      normal.update(itemPositive);
      // quality decreased twice: once before sellIn and once after
      expect(itemPositive.quality).toBe(0);
    });

    test("AgedBrie and Backstage respect MAX quality branch", () => {
      const brie = new lib.AgedBrieUpdater();
      const bItem = new Item('Aged Brie', 1, 50);
      brie.update(bItem);
      // should remain clamped at 50 and not overflow
      expect(bItem.quality).toBe(50);

      const back = new lib.BackstageUpdater();
      const b2 = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50);
      back.update(b2);
      // stays at 50 and after sellIn still 50 (updateAfterSellIn would set 0 only when sellIn < 0)
      expect(b2.quality).toBe(50);

      const b3 = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20);
      back.update(b3);
      // after concert must drop to 0
      expect(b3.quality).toBe(0);
    });

    test("Shop constructor default parameter when no items passed", () => {
      const s = new Shop();
      const result = s.updateQuality();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    test("UpdaterFactory returns correct updaters for each item name", () => {
      expect(lib.UpdaterFactory.getUpdater(new Item('Aged Brie', 1, 1))).toBeInstanceOf(lib.AgedBrieUpdater);
      expect(lib.UpdaterFactory.getUpdater(new Item('Backstage passes to a TAFKAL80ETC concert', 1, 1))).toBeInstanceOf(lib.BackstageUpdater);
      expect(lib.UpdaterFactory.getUpdater(new Item('Sulfuras, Hand of Ragnaros', 1, 1))).toBeInstanceOf(lib.SulfurasUpdater);
      expect(lib.UpdaterFactory.getUpdater(new Item('some other', 1, 1))).toBeInstanceOf(lib.NormalUpdater);
    });

    test("NormalUpdater does nothing for Sulfuras item (branch)", () => {
      const normal = new lib.NormalUpdater();
      const sulf = new Item('Sulfuras, Hand of Ragnaros', 3, 10);
      normal.update(sulf);
      expect(sulf.sellIn).toBe(3);
      expect(sulf.quality).toBe(10);
    });

    test("Backstage edge boundaries: sellIn = 11 and sellIn = 6", () => {
      const b11 = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20);
      new Shop([b11]).updateQuality();
      // sellIn 11 -> not <11, so only +1
      expect(b11.quality).toBe(21);

      const b6 = new Item('Backstage passes to a TAFKAL80ETC concert', 6, 20);
      new Shop([b6]).updateQuality();
      // sellIn 6 -> <11 true, <6 false -> +2 total
      expect(b6.quality).toBe(22);
    });

    test("direct calls to base updater hooks and isSulfuras", () => {
      const base = new lib.ItemUpdater();
      const it = new Item('any', 2, 5);
      // direct no-op hooks
      base.updateBeforeSellIn(it);
      base.updateAfterSellIn(it);
      // isSulfuras direct checks
      expect(base.isSulfuras(new Item('Sulfuras, Hand of Ragnaros', 0, 0))).toBe(true);
      expect(base.isSulfuras(new Item('foo', 0, 0))).toBe(false);
    });

    test("BackstageUpdater.updateBeforeSellIn combinations cover all inner branches", () => {
      const back = new lib.BackstageUpdater();

      const bMax = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50);
      back.updateBeforeSellIn(bMax);
      expect(bMax.quality).toBe(50); // outer if false

      const b15 = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20);
      back.updateBeforeSellIn(b15);
      expect(b15.quality).toBe(21); // only first increase

      const b10 = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20);
      back.updateBeforeSellIn(b10);
      expect(b10.quality).toBe(22); // +2

      const b5 = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20);
      back.updateBeforeSellIn(b5);
      expect(b5.quality).toBe(23); // +3
    });

    test("Quality.clamp covers <MIN, >MAX and in-range", () => {
      expect(lib.Quality.clamp(-5)).toBe(0);
      expect(lib.Quality.clamp(100)).toBe(50);
      expect(lib.Quality.clamp(25)).toBe(25);
    });
  });
});
