export const items = {
  'coin': {
    name: '金币',
    icon: 'coin1',
    color: 'coin',
    background: 'common',
    caption: '咔～磬～',
    desc: '这个世界的基本货币。你可以通过击败敌人、随机事件和打开宝箱获得金币。你可以用金钱从商人处购买商品，或是购买牧师的服务，还可以用于贿赂。\n无法在战斗中使用。',
    use: [],
  },
  'cum': {
    name: '精液瓶',
    icon: 'mp_potion',
    color: '',
    background: 'common',
    caption: '我没有找到保险套的图标qwq',
    desc: '被装在橡胶容器里的精液\n白浊法师的特殊道具。她们每次攻击的时候都需要消耗一个 精液瓶。\n她们可以从敌人或自己的身体中获取新的精液瓶。',
    use: [],
  },
  'honey': {
    name: '黏稠蜂蜜',
    icon: 'hp_potion',
    color: '',
    background: 'common',
    caption: '',
    desc: '这是从能产生媚药的植物花粉中精炼出的蜂蜜。\n它非常地黏，所以你可以用它来拖慢敌人的速度。你也可以喝下它，恢复自己HP，但自己会微微发情。',
    use: [
      {
        name: '你将它扔向敌人',
        effect: '敌人骰子点数减少1点',
        task: '如果敌人的攻击需要你用到润滑液，在你的润滑液中混入部分蜂蜜。',
      },
      {
        name: '你喝下了它',
        effect: '回复5点生命值',
        task: '喝下10mL蜂蜜。你下一回合的bpm将増加20点。',
      },
    ],
  },
  'philter': {
    name: '浓缩媚药',
    icon: 'hp_potion',
    color: '',
    background: 'common',
    caption: '只需一滴，让你像水龙头一样射个不停，呵呵～',
    desc: '从产生媚药的植物中提取的媚药精华。\n从产生媚药的植物中提取的媚药精华。',
    use: [
      {
        name: '你将它扔向敌人',
        effect: '敌人受到3点伤害',
        task: '下个回合敌人的骰子点数 +2，且你受到的伤害增加1点。',
      },
    ],
  },
  'scroll_climax': {
    name: '绝顶卷轴',
    icon: 'scroll',
    color: 'uncommon',
    background: 'scroll1',
    caption: '咿...!去了...!!',
    desc: '会让使用者立即高潮的卷轴。\n基本效果就是立刻让你高潮一次，即使你被锁在贞操带中。它可以在任何时候被使用。',
    use: [
      {
        name: '你使用了它',
        effect: 'HP减少3点',
        task: '你可以暂时移除你的贞操带。你有5分钟的时间来让自己绝顶。\n你必须完全绝顶: 直至射精完全结束，你都不可以停止或减少刺激的力度。若你在战斗中使用，绝顶后对敌人造成5点伤害。',
      },
    ],
  },
  'scroll_lewd': {
    name: '符文卷轴: 淫',
    icon: 'scroll',
    color: '',
    background: 'scroll2',
    caption: '',
    desc: '记载了用于增强自己能力的淫荡文字的卷轴。\n它可以在任何时侯被使用。',
    use: [
      {
        name: '你使用了它',
        effect: '你造成的伤害提高1点',
        task: '你必须用红色记号笔在你的身体上写下大大的“淫荡[你的种族名]”几个字。只要它没被擦除，此效果就可以一直起作用。',
      },
    ],
  },
  'herb': {
    name: '镇静草药',
    icon: 'herb',
    color: '',
    background: 'common',
    caption: '暴风吸入吧!我的英雄!',
    desc: '一种可以用来做成饮料的草药。当它被酿成酒后，即使是重度发情的冒险者也会冷静下来。\n你可以直接咀嚼它来回复一些HP。\n你可以在任何时候使用它。',
    use: [
      {
        name: '你把它放进了嘴里',
        effect: '你的HP回复8点',
        task: '在你的下一顿饭中加入蔬莱沙拉',
      },
    ],
  },
  'wine': {
    name: '镇静之酒',
    icon: 'hp_potion',
    color: 'uncommon',
    background: 'uncommon',
    caption: '',
    desc: '用镇静药草和糖酿制的美酒\n当你持有3个镇静药草时，你可以花费一个格子的时间，将其合成为此物品。\n喝下镇静之酒可以消除一层<span class="color_curse">诅咒</span>。\n你可以在任何时侯使用它。',
    use: [
      {
        name: '你喝下了瓶中的液体',
        effect: '你的某个<span class="color_curse">诅咒</span>减少了一层。',
        task: '喝下一小杯带酒精饮料。并且你的下三个回合的bpm减少30点。',
      }
    ],
  },
  'juice': {
    name: '恢复药水',
    icon: 'hp_potion',
    color: '',
    background: 'common',
    caption: '其实基本就是果汁。',
    desc: '炼金术师们大量生产的药水，效果一般。\n可以恢复HP，没别的效果。你在可以任何时候使用它。',
    use: [
      {
        name: '你喝下了它',
        effect: '你的HP恢复3点。',
        task: '喝一小杯果汁。',
      }
    ],
  },
  'milk': {
    name: '荷斯陶洛斯牛奶',
    icon: 'mp_potion',
    color: 'uncommon',
    background: 'uncommon',
    caption: '嗯～下次尝尝雄性荷斯陶洛斯的牛奶吧～',
    desc: '<a class="link" href="https://zhmonstergirlencyclopedia.miraheze.org/wiki/荷斯陶洛斯">荷斯陶洛斯</a>乳房中榨出的牛奶。它可以恢复你的生命值。用下面的嘴喝吸收更快。任何时候均可使用。',
    use: [
      {
        name: '你喝下了牛奶',
        effect: '你的HP恢复5点。',
        task: '喝下 200mL 牛奶。',
      },
      {
        name: '你决定让它吸收更快',
        effect: '你的HP恢复10点。',
        task: '将200mL牛奶注入后穴。然后你必须正常地做其他任务。80分钟后将其排出。',
      },
    ],
  },
  'spring': {
    name: '圣泉药剂',
    icon: 'spring_potion',
    color: '',
    background: 'epic',
    caption: '',
    desc: '从分布在世界各名处的圣泉中提取的药剂。\n圣泉药剂只可以通过直肠给药。它可以治愈你屁股里被施加的<span class="color_curse">诅咒</span>。你可以在任何时候使用它。',
    use: [
      {
        name: '你将药水全部注入了你的菊穴',
        effect: '你的诅咒减少了。',
        task: '将 1000mL 水注入直肠。你需要等待30分钟来吸收药剂的效果。期间你可以短暂地休息。之后你可以去除一层<span class="color_curse">[肉穴酸痛]</span>或 <span class="color_curse">[体内受精]</span>。若你提前排出了药水，则药水不会起作用。',
      },
    ],
  },
  'jerky': {
    name: '绿兽人的肉干',
    icon: 'jerky',
    color: '',
    background: 'uncommon',
    caption: '呕～那个绿兽人平时都把这玩意藏在哪啊!',
    desc: '绿兽人爱吃的内干。由未知动物制成。\n在战斗中食用此肉干，你的下一次攻击将必定打出高额伤害。',
    use: [
      {
        name: '你勉强将其吞下',
        effect: '你的下次攻击将必定为</span class="color_key">[会心]</span>。',
        task: '吃下一块肉干或者其他零食。食用前必须充分地用你的肉棒给零食添加味道，并且蘸上精液食用。',
      }
    ],
  },
  'slave_key': {
    name: '奴隶钥匙',
    icon: 'key1',
    color: '',
    background: 'epic',
    caption: '你真是一个不听话的奴隶。',
    desc: '能解开强盗给你套上的枷锁和项圈的钥匙。\n使用它将解放你被施加的奴隶诅咒。你可以在任何时候使用。',
    use: [
      {
        name: '你使用了钥匙',
        effect: '你的诅咒减少了',
        task: '减少一层<span class="color_curse">[奴隶标记]</span>的效果。',
      }
    ],
  },
  'rope': {
    name: '逃生绳',
    icon: 'rope',
    color: '',
    background: 'uncommon',
    caption: '它能保护你的后庭!',
    desc: '魔法物品。能让你传送至安全地点。\n使用后你将立刻脱离当前的战斗。你不会得到任何战斗奖励。只能在战斗中使用。',
    use: [
      {
        name: '你发动了传送魔法',
        effect: '你逃跑了。',
        task: '立刻结東当前的战斗。',
      }
    ],
  },
  'chest_key': {
    name: '宝箱钥匙',
    icon: 'key2',
    color: '',
    background: 'epic',
    caption: '好好搜刮宝箱里的物品吧!',
    desc: '魔法道具。能够打开任意宝箱的钥匙。\n但是它的魔カ很弱，使用一次后就失效了。',
    use: [],
  },
  'godness_dice': {
    name: '女神的骰子',
    icon: 'dice',
    color: 'uncommon',
    background: 'epic',
    caption: '喂!你不能用那个!那是我的!',
    desc: '轮盘之神的力量之源之一。你可以用它来操作随机之カ的效果。\n投掷女神的骰子可以重置你的命运。你可以在任何需要投掷般子的场合使用它。<span class="color_skill">[可重复使用]</span>。',
    use: [
      {
        name: '你投出了骰子',
        effect: '你的命运改变了',
        task: '使用新骰子的点数覆盖你原来的点数。你只可以对每个骰子使用一次。你必须接受你新的命运!',
      },
    ],
  },
  'herb2': {
    name: '净化草',
    icon: 'herb2',
    color: '',
    background: 'uncommon',
    caption: '你为什么要使用它呢？你很享受被侵犯的对吧～',
    desc: '上面长着蓝色小花的药草。它能抑制媚药的效果。\n使用净化草后将暂时屏蔽你任何来源的bpm增加或是时间延长的负面效果。包括你的种族被动和诅咒。你只能在战斗中使用净化草。',
    use: [
      {
        name: '你嚼碎了药草',
        effect: '你的负面状态暂时消除了',
        task: '在当前战斗中，你不需要增加任何的bpm或是延长任何任务的时间。',
      }
    ],
  },
  'lucky_amulet': {
    name: '幸运护身符',
    icon: 'amulet',
    color: 'uncommon',
    background: 'epic',
    caption: '啊啊啊啊～～快把这个给我啊啊～～～',
    desc: '能够增加你幸运值的项链。\n在战斗中触发它的效果可以保证你打出会心攻击。但是它的影响范围太广了所以你的敌人也会得到增强。\n每场战斗只能使用一次。<span class="color_skill">[可重复使用]</span>。',
    use: [
      {
        name: '你使用了护身符',
        effect: '温暖的力量从你身体中散发出来',
        task: '你和你的敌人的下次攻击将心必定为 <span class="color_key">[会心]</span>。',
      },
    ],
  },
}
