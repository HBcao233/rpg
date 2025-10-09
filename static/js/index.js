
document.addEventListener('DOMContentLoaded', function() {
  const sections = {
    0: {
    html: `<div class="box"><div class="title">文字颜色标识</div>
<table class="text_colors">
  <tr>
    <td>剧情文字</td>
    <td>基本的故事文字</td>
  </tr>
  <tr>
    <td class="color_task">任务文字</td>
    <td>你需要在现实里完成的任务</td>
  </tr>
  <tr>
    <td class="color_npc">NPC对话</td>
    <td>故事中出现的人物的台词</td>
  </tr>
  <tr>
    <td class="color_clothes">服装文字</td>
    <td>施述了你必须穿着的服装</td>
  </tr>
  <tr>
    <td class="color_passive">种族被动</td>
    <td>某种族的特定被动任务</td>
  </tr>
  <tr>
    <td class="color_curse">诅咒文字</td>
    <td>和诅咒系统相关的文字</td>
  </tr>
  <tr>
    <td class="color_enemy">敌方种类</td>
    <td>描述敌人种类的文字</td>
  </tr>
  <tr>
    <td class="color_dick">阴茎特征</td>
    <td>需要使用的自慰棒的特征</td>
  </tr>
  <tr>
    <td class="color_key">关键道具</td>
    <td>特殊事件中需要使用到的道具</td>
  </tr>
</table>
</div>`,
    },
    1: {
      html: `<div class="box">
  <p>某一天早上你从床上起来，准备去做日常工作。当你正从家里出来时，一辆大卡车突然出现在路上。瞬间，你的视野陷入一片黑暗……等你清醒过来时，你发现自己并不在医院里，而是在一个像是天堂般的地方，一位穿着花哨的女神正一边笑着一边俯视着你。被那东之国称为“异世界转生”的事件似乎发生在了你的身上。你决定抛弃你的过去，在这个新的幻想世界开始自己新的生活！</p>
</div>`,
    },
    2: {
      html: `<div class="box">
  <div class="title text-center color_enemy">地狱轮盘女神</div>
  <div class="image_box"><img src="/static/images/hell_goddess.jpg"></div>
  <p>我这个最资深的轮盘女神会监督你的旅程。你在路上可能会遇到我的姐妹们，记得代我向她们打声招呼，她们可能会帮一把的! 你要在旅途之中打败恶魔领主。他们用淫秽邪恶的魔法腐蚀了这片大地。我会给你祝福，让你获得特殊的能カ和属性后，重生于那片大地的，库库库。</p>
</div>`,
    },
    3: {
      html: `<div class="box"><div class="title text-center color_enemy">地狱轮盘女神</div><div class="image_box"><img src="/static/images/hell_goddess.jpg"></div><p>可惜的是，作为轮盘之神，我的力量其实是......随机的。所以你可能会死掉然后又回到我这里来......我好像不小心剧透了......别担心! 不管你死了多少次，我都会把你一次又一次复活 直到你打败恶魔领主的，呐～</p></div>`,
    },
    4: {
      html: `<div class="box"><div class="title text-center color_enemy">地狱轮盘女神</div><div class="image_box"><img src="/static/images/hell_goddess.jpg"></div><p>前一任恶魔领主死后，一切都变了。一位高阶魅魔取缔了他的位置，这个世界上所有生物都必须遵守的新的视则被制定。现在世界正处于ー片混乱之中，所有人都在像动物一样交配! 听好了，这就是这个世界的规则!</p></div>`,
    },
    5: {
      html: `<div class="box"><div class="title text-center color_enemy">地狱轮盘女神</div><div class="image_box"><img src="/static/images/hell_goddess.jpg"></div><p>在我们的旅途开始之前，让我先来说明下这个异世界是怎么回事吧。你被赐予了轮盘或者骰子之カ。你投出的点数决定了你接下来的行动。看到下面的<span class="color_random">骰子</span>了吗，试试点击它。</p><br><div class="dice d6" data-sides="6" data-action="show_action" style="margin-left: 2em"></div><p class="action" style="display: none">(1) 继续</p></div>`,
    },
    6: {
      html: `<div class="box"><div class="title text-center color_enemy">地狱轮盘女神</div><div class="image_box"><img src="/static/images/hell_goddess.jpg"></div><p>好了～现在让我们先来把你重生吧～你需要投两个骰子，一个决定你的阵营，一个决定你的职业。当然你要是想选自己喜欢的角色也是没问题的哦～</p></div>`,
    },
    7: {
      html: `<div class="box" id="转生服务中心">
    <div class="btn selection action" data-action="selection">自选模式</div>
    <div class="title text-center">转生服务中心</div>
    <div class="row center step1">请先投一颗骰子决定你的阵营</div>
    <div class="row center dice1" style="margin-top: 5px">
      <div class="dice d6" data-sides="6" id="dice_camp" data-action="random_camp"></div>
    </div>
    <div class="row center">
      <div class="box camp camp1" id="camp1" data-action="change_camp-1">
        <div class="color_random">骰子点数 1-3</div>
        <div class="color_camp1">英雄阵营</div>
      </div>
      <div class="box camp camp2" id="camp2" data-action="change_camp-2">
        <div class="color_random">骰子点数 4-6</div>
        <div class="color_shadow">暗影阵营</div>
      </div>
    </div>
    <div class="row center step2">请再投一颗骰子决定你的种族</div>
    <div class="row center dice2" style="margin-top: 5px">
      <div id="dice_race" class="dice d6 disabled action" data-sides="6" data-action="random_race"></div>
    </div>
    <div class="row center dice2_selection" style="margin-top: 5px; display: none">
      <div class="dice disabled_dice d1 action" data-sides="6" data-action="change_race-1"></div>
      <div class="dice disabled_dice d2 action" data-sides="6" data-action="change_race-2"></div>
      <div class="dice disabled_dice d3 action" data-sides="6" data-action="change_race-3"></div>
      <div class="dice disabled_dice d4 action" data-sides="6" data-action="change_race-4"></div>
      <div class="dice disabled_dice d5 action" data-sides="6" data-action="change_race-5"></div>
      <div class="dice disabled_dice d6 action" data-sides="6" data-action="change_race-6"></div>
    </div>
  </div><div class="box race"></div>`,
      load: function () {
        if (save.camp) {
          $('#dice_camp').classList.remove('d6');
          $('#dice_camp').classList.add(`d${save.camp * 3}`);
          $(`#camp${save.camp}`).classList.add('active');
          $(`#dice_camp`).classList.add('disabled');
          $(`#dice_race`).classList.remove('disabled');
        }
        if (save.race) {
          $('#dice_race').classList.remove('d6');
          $('#dice_race').classList.add(`d${save.race}`);
          $(`#dice_race`).classList.add('disabled');
          setTimeout(() => showRace(), 10);
        }
        if (save.selection) enterSelection()
      }
    },
    8: {
      html: `<div class="box"><p>你重生在了一座森林的入口处。你的新身体感觉很好，但是还需要适应，你已经迫不及待地要开始你的旅途了，在森林中走了短短几分钟之后，又出现了一个女神，当她似乎与你刚刚在地狱遇到的女神有所不同。她介绍着自己是轮盘文神的第二个姐妹，拥有掌管凡人世界的权力。随后，她向你展示了这座森林的地图。</p></div>`,
    },
    9: {
      html: `<div class="box"><p>你站在淫暗森林的入口，斑驳的阳光透过层层叠叠的枝叶洒下，潮湿的泥土混着草木清香扑面而来，一条隐约的小径蜿蜒向密林深处。</p><br><p class="action">(1) 前进</p></div>`
    },
    '10': {
      html: `<div class="box box13">
  <p>你沿着小径小心翼翼地前进，周围的树木越来越高大，光线也越来越暗。突然，草丛中传来一阵窸窣声。</p>
  <div style="text-indent: 2em">请投掷骰子: <div class="dice d6" data-sides="6" data-action="random_enemy"></div></div>
</div>`,
      load: function () {
        let i;
        for (i = save.history.length - 1; i >= 0; i--) {
          if (save.history[i].type == 'to_section' && save.history[i].section == 10) {
            break;
          }
        }
        if (save.history[i+1] && save.history[i+1].action == 'random_enemy') {
          $('.dice').classList.add('disabled');
          $('.dice').classList.remove('d6');
          $('.dice').classList.add('d' + save.history[i+1].dice);
          showEnemy(save.history[i+1].dice);
          if (save.history[i+2] && save.history[i+2].action == 'attack_enemy') {
            $('.dice[data-action="attack_enemy"]').classList.add('disabled');
            $('.dice[data-action="attack_enemy"]').classList.remove('d6');
            $('.dice[data-action="attack_enemy"]').classList.add('d' + save.history[i+2].dice);
            attackEnemy(save.history[i+2].dice);
          }
        }
      }
    }
  };
  const chest_items = ['herb', 'rope', 'slave_key', 'lucky_amulet', 'coin@50', 'godness_dice'];
  const current_enemys = ['thieves_brothers', 'werewolf', 'bee', 'normal_orcish', 'sorceress', 'aphrodisiac_plant'];
  const map_blocks = {
    0: {
      type: 'start',
      parent: null,
      children: [0],
      x: 45.30,
      y: 90.50,
      width: 'auto',
      height: 'auto', 
      label: '#0 淫乱森林的入口',
    },
    1: {
      type: 'battle',
      parent: 0,
      children: [2],
      x: 46.85,
      y: 84.70,
    },
    2: {
      type: 'random_event',
      parent: 1,
      children: [3],
      x: 46.7,
      y: 77.5,
    },
    3: {
      type: 'battle',
      parent: 2,
      children: [4, 5],
    },
    4: {
      type: 'random_event',
      parent: 3,
      children: [6],
    },
    5: {
      type: 'battle',
      parent: 3,
      children: [7],
    },
  };
  
  const getSectionText = (id) => {
    const element = tag('div', {
      style: 'display: none',
      innerHTML: sections[id].html,
    });
    document.body.appendChild(element);
    const result = getElementText(element);
    element.remove();
    return result;
  }
  
  let x;
  let save = {};
  if (!save.history) save.history = [];
  if (getValue('map_show_reverse') == '1') {
    $('#map_show_reverse').checked = true;
    $('.container').classList.add('map_show_reverse');
  }
  if (getValue('status_show_reverse') == '1') {
    $('#status_show_reverse').checked = true;
    $('.wrapper').classList.add('status_show_reverse');
  }
  if (x = getValue('save')) {
    save = JSON.parse(x);
  }
  if (save.section === undefined) {
    $('.btn.continue').classList.add('disabled');
  }
  const setSave = () => {
    save.update_time = parseInt(Date.now() / 1000);
    setValue('save', JSON.stringify(save));
  }
  
  let map;
  function showMap() {
    $('.map_container').classList.add('show');
    map = new MapController();
    for (const [k, v] of Object.entries(map_blocks)) {
      map.addMarker({
        key: k,
        type: v.type,
        x: v.x,
        y: v.y,
        width: v.width,
        height: v.height,
        label: v.label,
      });
    }
    const player_marker = map.addMarker({
      x: 47.00,
      y: 75.00,
      id: 'player',
      type: 'pin',
    })
  }
  function updateStatus() {
    const r = race_info[save.race_key];
    $('.player_status').classList.add('show');
    $('.player_status .race_image').src = `/static/images/race_${save.race_key}.jpg`;
    $('.player_status .race_name_box').classList.add('color_camp' + save.camp)
    $('.player_status .race_name').innerText = r.name;
    $('.player_status .race_details').innerHTML = `<p>${r.desc}</p>`;
    $('.player_status .hp').innerText = `${save.player.hp} / ${r.hp}`;
    $('.player_status .atk').innerText = save.player.atk;
    
    $('.player_status .effects').innerHTML = '';
    // 服饰信息
    $('.player_status .effects').appendChild(tag('div', {
      class: 'tooltip effect color_clothes',
      innerHTML: `<span>[${r.clothes.name}]</span><div class="tooltip-box"><div class="image_box" style="width: 150px; margin: 0 auto"><img src="/static/images/race_${save.race_key}_clothes.jpg"></div><p>${r.clothes.desc}</p><br><p class="color_task">${r.clothes.task}</p></div>`,
    }));
    // 被动技能
    for (const i of r.passive_skill) {
      $('.player_status .effects').appendChild(tag('div', {
        class: 'tooltip effect color_passive',
        children: [
          tag('span', {
            innerText: i.name,
          }),
          tag('div', {
            class: 'tooltip-box',
            innerHTML: `<p>${i.desc}</p><br><p class="color_task">${i.task}</p>`
          })
        ]
      }));
    }
  }
  /**
   * 显示玩家状态
   */
  function showStatus() {
    updateStatus();
    $('.player_status').classList.add('show');
  }
  /**
   * 切换内容
   */
  function updateSectionHeight() {
    $('.progress-container').style.height = ($('section:last-child').getBoundingClientRect().height) + 'px';
    if (getValue('map_show_reverse') != '1') $('.container').scrollTo(0, 0);
    else $('.container').scrollTop = -$('.container').scrollHeight;
  }
  function switchSection(id) {
    let t;
    if (t = $('dialog[open]')) t.close();
    window.scrollTo(0, 0);
    let x, y;
    if (x = $('section.show')) x.classList.remove('show');
    if (x.id == 'section-title_screen') x = null;
    if (id == 'title_screen') {
      y = $('#section-title_screen');
      $('.map_container').classList.remove('show');
      $('.player_status').classList.remove('show');
    } else {
      let html = '<div class="box">你好像来到了未知领域(ㅇㅅㅇ)</div>';
      
      let load = null;
      if (id > Math.max(...Object.keys(sections).map((i) => parseInt(i)))) {
        html = '<div class="box">后面还没做了捏亲＾3＾</div>';
      } else if (sections[id]) {
        if (save.section != id) {
          save.section = id;
          let history = save.history || [];
          history.push({
            type: 'to_section',
            section: id,
          });
          save.history = history;
          setSave();
        }
        html = sections[id].html;
        load = sections[id].load;
      }
      try {
        $('.progress-container').appendChild(y = tag('section', {
          id: 'section-' + id,
          attrs: {
            'data-section': id,
          },
          innerHTML: html,
        }));
      
        load && load.apply(y);
      } catch (e) {
        console.error(`加载section-${id}错误:`, e);
        return;
      }
      if (save.section > 7) {
        showMap();
        showStatus();
      }
    }
    setTimeout(() => {
      y.classList.add('show');
      if (x) y.ontransitionend = function() {
        x.remove();
      }
      
      setTimeout(function() {
        updateSectionHeight();
      }, 90);
      
    }, 10);
  }
  /**
   * 执行玩家操作
   */
  function executeAction() {
    if (this.classList.contains('disabled') && !this.classList.contains('disabled_dice')) return;
    [action, arg] = (this.getAttribute('data-action') || '').split('-', 1);
    // console.log('action:', action, 'arg:', arg)
    switch (action) {
      case '':
        if (!this.classList.contains('action')) return;
        arg = parseInt(this.closest('section').getAttribute('data-section')) + 1;
        switchSection(arg);
        break;
      case 'to_section':
        switchSection(arg);
        break;
      
      // 切换自选模式
      case 'selection':
        switchSelection();
        break;
      // 切换阵营
      case 'change_camp':
        change_camp(arg)
        break;
      case 'change_race':
        change_race(arg)
        break;
        
      // 打开物品栏
      case 'show_inventory':
        showInventory();
        break;
      // 打开选项菜单
      case 'show_options':
        showOptions();
        break;
      // 回到标题界面
      case 'title_screen':
        switchSection('title_screen');
        break;
      // 设置
      case 'settings':
        showSettings();
        break;
      // 存档
      case 'saves':
        showSaves();
        break;
      // 加载存档
      case 'load_save':
        loadSave(arg);
        break;
      // 保存存档 
      case 'save_save':
        saveSave(arg);
        break;
      // 删除存档
      case 'delete_save':
        deleteSave(arg);
        break;
      // 导出存档 
      case 'export_save':
        exportSave(arg);
        break;
      // 导入存档
      case 'upload_save':
        uploadSave(arg);
        break;
      // 显示回忆
      case 'show_recall':
        showRecall(arg);
        break;
    }
  }
  
  /**
   * 显示种族
   */
  function showRace() {
    $('section[data-section="7"]').appendChild(tag('div', {
      class: 'box',
      innerHTML: '<p class="action">(1) 继续</p>'
    }));
    setTimeout(() => {
      updateSectionHeight()
    }, 100);
    
    const rs = [
      ['princess', 'wizard', 'elf', 'dwarf', 'beastwoman', 'holstaurus'],
      ['witch', 'succubus', 'asceticist', 'zombie', 'corrupted', 'robot'],
    ];
    save.race_key = rs[save.camp-1][save.race-1];
    save.history.push({
      type: 'select_race',
      race: save.race_key,
    })
    const r = race_info[save.race_key];
    save.player = {
      hp: r.hp,
      atk: r.atk,
    }
    setSave();
    $('.race').classList.add('show');
    $('.race').classList.add(`camp${save.camp}`);
    $('.race').innerHTML = `<div class="race_header">
  <div class="image_box"><img src="/static/images/race_${save.race_key}.jpg" /></div>
  <div class="race_name color_camp1">～${r.name}～</div>
  <p class="race_details">${r.desc}</p>
</div>
<div class="race_info race_clothes">
  <div class="header">
    <div class="title">服饰</div>
  </div>
  <div class="image_box">
    <img src="/static/images/race_${save.race_key}_clothes.jpg" />
  </div>
  <div class="race_info_details">
    <div class="race_info_title color_clothes">[${r.clothes.name}]</div>
    <p>${r.clothes.desc}</p>
    <br>
    <p class="color_task">${r.clothes.task}</p>
  </div>
</div>
<div class="race_info race_passive_skill">
  <div class="header">
    <div class="title">职业被动</div>
  </div>
  <div class="race_skills">
    <div class="race_skill">
      <div class="image_box">
        <img src="/static/images/race_${save.race_key}_passive_skill1.jpg" />
      </div>
      <div class="race_info_details">
        <div class="race_info_title color_passive">[${r.passive_skill[0].name}]</div>
        <p>${r.passive_skill[0].desc}</p>
        <br>
        <p class="color_task">${r.passive_skill[0].task}</p>
      </div>
    </div>
    <div class="race_skill">
      <div class="image_box">
        <img src="/static/images/race_${save.race_key}_passive_skill2.jpg" />
      </div>
      <div class="race_info_details">
        <div class="race_info_title color_passive">[${r.passive_skill[1].name}]</div>
        <p>${r.passive_skill[1].desc}</p>
        <br>
        <p class="color_task">${r.passive_skill[1].task}</p>
      </div>
    </div>
  </div>
</div>
<div class="race_info race_active_skill">
  <div class="header">
    <div class="title">攻击技能</div>
  </div>
  <div class="race_skills">
    <div class="race_skill">
      <div class="race_info_details">
        <div class="race_info_title color_bad">[弱击] ${r.active_skill[0].name}</div>
        <p class="color_task">${r.active_skill[0].task}</p>
        <br>
        <div class="race_info_title color_useful">[有效] ${r.active_skill[1].name}</div>
        <p class="color_task">${r.active_skill[1].task}</p>
        <br>
        <div class="race_info_title color_key">[会心] ${r.active_skill[2].name}</div>
        <p class="color_task">${r.active_skill[2].task}</p>
      </div>
    </div>
    <div class="race_skill">
      <div class="image_box">
        <img src="/static/images/race_${save.race_key}_ult.jpg" />
      </div>
      <div class="race_info_details">
        <div class="race_info_title color_skill">[特殊技能] ${r.ult.name}</div>
        <p>${r.ult.desc}</p>
        <br>
        <p class="color_task">${r.ult.task}</p>
      </div>
    </div>
  </div>
</div>`;
  }
  /**
   * 切换自选模式
   */
  function enterSelection() {
    save.selection = 1;
    setSave();
    $('.selection').classList.add('active');
    $('.step1').innerText = '请先选择你的阵营';
    $('.step2').innerText = '请选择一颗骰子决定你的种族';
    $('.dice1').style.display = 'none';
    $('#camp1').classList.add('action');
    $('#camp2').classList.add('action');
    $('.dice2').style.display = 'none';
    $('.dice2_selection').style.display = '';
    if (save.camp) $(`#camp${save.camp}`).classList.add('active');
    if (save.race) $(`.dice2_selection .d${save.race}`).classList.add('active');
  }
  function leaveSelection() {
    save.selection = 0;
    setSave();
    $('.selection').classList.remove('active');
    $('.step1').innerText = '请先投一颗骰子决定你的阵营';
    $('#camp1').classList.remove('action');
    $('#camp2').classList.remove('action');
    $('.step2').innerText = '请再投一颗骰子决定你的种族';
    $('.dice1').style.display = 'flex';
    if (save.camp) {
      $('#dice_camp').classList.remove('d1', 'd2', 'd3', 'd4', 'd5', 'd6');
      $('#dice_camp').classList.add(`d${save.camp * 3}`);
    }
    if (save.race) {
      $('#dice_race').classList.remove('d1', 'd2', 'd3', 'd4', 'd5', 'd6');
      $('#dice_race').classList.add('d' + save.race);
    }
    $('.dice2').style.display = '';
    $('.dice2_selection').style.display = 'none';
  }
  function switchSelection() {
    if (!save.selection) enterSelection();
    else leaveSelection();
    if (save.camp && save.race) showRace();
  }
  function change_camp(camp) {
    save.camp = parseInt(camp);
    setSave();
    $('#camp1').classList.remove('active');
    $('#camp2').classList.remove('active');
    $(`#camp${camp}`).classList.add('active');
    if (save.race) showRace();
  }
  function change_race(race) {
    save.race = parseInt(race);
    setSave();
    showRace();
    let t;
    if (t = $('.dice2_selection .dice.active')) t.classList.remove('active');
    $(`.dice2_selection .d${save.race}`).classList.add('active');
  }
  /**
   * 显示物品栏
   */
  function showInventory() {
    $('#inventory .items').innerHTML = '<div style="color: #a1a1a1; margin: 20px auto">你的背包空空如也...</div>'
    $('#inventory').showModal();
  }
  function showOptions() {
    $('#options').showModal();
  }
  function showSettings() {
    $('#settings').showModal();
  }
  /**
   * 显示存档
   */
  function showSaves() {
    if (save.update_time) $('#save-0 .save_time').innerText = formatDateTime(save.update_time).split(':').slice(0,2).join(':');
    let desc = '空';
    if (save.section !== undefined) {
      let race_name = '';
      if (save.race_key) {
        race_name = race_info[save.race_key].name;
        let race_color = '#ffb700';
        if (save.camp == 2) 
          race_color = '#7530a4';
        race_name = `ō${race_name}óǒ${race_color}ò: `;
      }
      desc = cutElementText(race_name + getSectionText(save.section));
    }
    $('#save-0 .save_desc').innerHTML = elementText2html(desc);
    let saves = [];
    if (getValue('saves')) {
      saves = JSON.parse(getValue('saves'));
    } else {
      for (let i = 0; i < 10; i++) {
        saves.push({
          desc: '空',
          create_time: 0,
          save: '',
        });
      }
      setValue('saves', JSON.stringify(saves));
    }
    if (!$('#save-1')) {
      for (let i = 0; i < 10; i++) {
        let desc = saves[i].desc || '空';
        desc = elementText2html(desc);
        let create_time = saves[i].create_time;
        if (create_time) create_time = formatDateTime(create_time).split(':').slice(0,2).join(':');
        else create_time = '';
        $('#saves .items').appendChild(tag('div', {
          class: 'box',
          id: `save-${i+1}`,
          innerHTML: `<div class="save_info">
  <div class="save_name">存档 ${i+1}</div>
  <div class="save_controls row">
    <button class="btn delete_save danger" data-action="delete_save-${i+1}">删除</button>
    <button class="btn save_save" data-action="save_save-${i+1}">保存</button>
    <button class="btn load_save" data-action="load_save-${i+1}">加载</button>
  </div>
</div>
<div class="save_desc">${desc}</div>
<div class="save_details">
  <div class="save_time">${create_time}</div>
  <div class="save_controls row">
    <button class="btn export_save" data-action="export_save-${i+1}">导出</button>
    <button class="btn upload_save" data-action="upload_save-${i+1}">导入</button>
  </div>
</div>`,
        }))
      }
    }
    $('#saves').showModal();
  }
  /**
   * 加载存档
   */
  function loadSave(id) {
    id = parseInt(id);
    if (id === NaN) return; 
    let s;
    if (id != 0) {
      try {
        let saves = JSON.parse(getValue('saves'));
        s = saves[id-1].save;
        if (s == '') return alert('存档为空');
        s = JSON.parse(gz64_decode(s));
      } catch (e) {
        console.error('加载存档失败', e);
        alert('加载存档失败');
        return;
      }
      if (!s.section) {
        alert('存档不存在');
        return;
      }
      save = s;
    }
    if (save.section === undefined) {
      return alert('存档为空');
    }
    switchSection(save.section);
  }
  /**
   * 保存存档
   */
  function saveSave(id) {
    id = parseInt(id);
    if (id <= 0) return;
    if (id > 10) return alert('最多只能存10个存档！');
    let race_name = '';
    if (save.race_key) {
      let race_color = '#ffb700';
      if (save.camp == 2) 
        race_color = '#7530a4';
      race_name = `ō${race_info[save.race_key].name}óǒ${race_color}ò: `;
    }
    const desc = cutElementText(race_name + getSectionText(save.section));
    let s = {
      create_time: parseInt(Date.now() / 1000),
      desc: desc,
      save: gz64_encode(JSON.stringify(save)),
    }
    let saves = JSON.parse(getValue('saves'));
    saves[id - 1] = s;
    setValue('saves', JSON.stringify(saves));
    $(`#save-${id} .save_desc`).innerHTML = elementText2html(s.desc);
    $(`#save-${id} .save_time`).innerText = formatDateTime(s.create_time).split(':').slice(0,2).join(':');
  }
  /**
   * 删除存档
   */
  function deleteSave(id) {
    id = parseInt(id);
    if (id === NaN || id > 10) return alert('存档不存在');
    let name = '自动存档';
    if (id > 0) name = '存档 ' + id;
    if (!confirm(`确定要删除 ${name} 吗？`)) return;
    if (id == 0) {
      save = {};
      setSave();
      $(`#save-${id} .save_desc`).innerText = '空';
      $(`#save-${id} .save_time`).innerText = '';
      $('.btn.continue').classList.add('disabled');
      return;
    }
    let saves = JSON.parse(getValue('saves'));
    saves[id - 1] = {
      desc: '空',
      create_time: 0,
      save: '',
    };
    setValue('saves', JSON.stringify(saves));
    $(`#save-${id} .save_desc`).innerText = '空';
    $(`#save-${id} .save_time`).innerText = '';
  }
  /**
   * 导出存档
   */
  function exportSave(id) {
    id = parseInt(id)
    if (id == NaN || id > 10) return alert('存档不存在');
    let jsonString, create_time;
    if (id == 0) {
      if (!save.section) return alert('存档为空');
      let race_name = '';
      if (save.race_key) {
        race_name = race_info[save.race_key].name + ': ';
      }
      desc = race_name + getSectionText(save.section)
      if (desc.length > 60) desc = desc.slice(0, 60) + '...';
      create_time = save.update_time;
      jsonString = JSON.stringify({
        create_time: create_time,
        desc: desc,
        save: gz64_encode(JSON.stringify(save)),
      });
    } else {
      const saves = JSON.parse(getValue('saves'));
      if (!saves[id - 1].save) return alert('存档为空');
      create_time = saves[id - 1].create_time;
      jsonString = JSON.stringify(saves[id - 1])
    }
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    create_time = formatDateTime(create_time * 1000).replaceAll(':', '-').replace(' ', '_');
    const name = `save_${create_time}.json`
    downloadFile(url, name);
    URL.revokeObjectURL(url);
  }
  /**
   * 载入存档
   */
  function uploadSave(id) {
    id = parseInt(id)
    if (id == NaN || id <= 0 || id > 10) return alert('存档不存在');
    let saves = JSON.parse(getValue('saves'));
    const input = tag('input', {
      attrs: {
        type: 'file',
        accept: 'text/plain, application/json', 
      },
    });
    input.onchange = function() {
      const file = this.files[0];
      const maxSizeBytes = 10 * 1024 * 1024; 
      input.remove();
      if (!(['text/plain', 'application/json'].includes(file.type))) {
        return alert('必须是 json 或 txt 文件');
      }
      if (file.size > maxSizeBytes) {
        return alert('文件不能大于 10MB');
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const fileContent = e.target.result;
          let s = JSON.parse(fileContent);
          s = {
            create_time: s.create_time,
            desc: s.desc,
            save: s.save,
          }
          const save = JSON.parse(gz64_decode(s.save));
          if (save.section === undefined) {
            return alert('存档为空');
          }
          if (saves[id - 1].save && !confirm(`覆盖存档 ${id} 吗？`)) return;
          saves[id - 1] = s;
          setValue('saves', JSON.stringify(saves));
          $(`#save-${id} .save_desc`).innerHTML = elementText2html(s.desc);
          $(`#save-${id} .save_time`).innerText = formatDateTime(s.create_time).split(':').slice(0,2).join(':');
        } catch (e) {
          console.error('载入存档失败:', e);
          return alert('载入存档失败')
        }
      };
      reader.readAsText(file);
    }
    input.oncancel = function() {
      input.remove();
    }
    input.click();
  }
  /**
   * 显示回想
   */
  function showRecall() {
    $('#recall .items').innerHTML = '';
    for (const i of save.history.reverse()) {
      let t = tag('div', {
        class: 'box box9',
      });
      switch (i.type) {
        case 'to_section':
          t.innerHTML = elementText2html(getSectionText(i.section));
          break;
        case 'dice':
          let dice_name = {
            'random_camp': '选择阵营',
            'random_race': '选择职业',
          }[i.action] || '';
          t.innerText = `投掷${dice_name}骰子得到点数 ${i.dice}`
          break;
      }
      $('#recall .items').appendChild(t);
    }
    $('#recall').showModal();
  }
  /**
   * 显示敌人
   */
  let current_enemy = null;
  function showEnemy(dice) {
    current_enemy = current_enemys[dice - 1];
    const enemy = enemys[current_enemy];
    $('section:last-child .box').appendChild(tag('p', {
      innerHTML: `<span class="color_enemy">${enemy.name}</span> 出现了！`,
    }));
    $('section:last-child .box').appendChild(tag('div', {
      class: 'image_box',
      innerHTML: `<img src="/static/images/enemy_${current_enemy}.png">`,
    }));
    $('section:last-child .box').appendChild(tag('p', {
      innerHTML: '你的回合，请投掷骰子:',
    }));
    $('section:last-child .box').appendChild(parseHTML(`<div class="dice d6" data-sides="6" data-action="attack_enemy" style="margin-left: 2em"></div>`)[0]);
  }
  function attackEnemy(dice) {
    const attack_types = [
      { name: '弱击', color: 'bad' }, 
      { name:'有效', color: 'useful' }, 
      { name: '会心', color: 'key' },
    ];
    const attack_type = Math.floor((dice - 1) / 2);
    const attack_info = attack_types[attack_type];
    const r = race_info[save.race_key];
    const attack_details = r.active_skill[attack_type];
    const arr = parseHTML(`<br><div class="text-center color_${attack_info.color}">[${attack_info.name}] ${attack_details.name}</div><p class="color_task">${attack_details.task}</p>`)
    for (const i of arr) $('section:last-child .box').appendChild(i);
    
    
    $('section:last-child .box').appendChild(tag('div', {
      class: 'battle-tools',
      innerHTML: `<div class="timer">
  <div class="slider-container">
    <div class="circular-slider">
      <svg viewBox="0 0 300 300">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00f2fe;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4facfe;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle class="track" cx="150" cy="150" r="120"></circle>
        <circle class="progress" cx="150" cy="150" r="120"></circle>
      </svg>
      <div class="handle"></div>
      <div class="value-display">
        <div class="value-number">60</div>
      </div>
      <div class="marks">
        <span class="mark" style="top: 15px; left: 70px;">00:30</span>
        <span class="mark" style="bottom: 1px; left: 70px;">15:15</span>
        <span class="mark" style="top: 75px; left: 10px;">22:37</span>
        <span class="mark" style="top: 75px; right: -10px;">07:52</span>
        <span class="mark" style="top: 30px; left: 30px;">26:18</span>
        <span class="mark" style="top: 31px; right: 10px;">04:11</span>
        <span class="mark" style="bottom: 18px; left: 28px;">18:56</span>
        <span class="mark" style="bottom: 20px; right: 10px;">11:33</span>
      </div>
    </div>
  </div>
  
  <div class="row center">
    <button class="btn" data-amount="-30">-30</button>
    <button class="btn" data-amount="30">+30</button>
  </div>
  
</div>

<div class="metronome">
  <div class="slider-container">
    <div class="circular-slider">
      <svg viewBox="0 0 300 300">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00f2fe;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#4facfe;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle class="track" cx="150" cy="150" r="120"></circle>
        <circle class="progress" cx="150" cy="150" r="120"></circle>
      </svg>
      <div class="handle"></div>
      <div class="beat-indicator value-display" id="beatIndicator">
        <div class="bpm-display value-number" id="bpmValue">60</div>
      </div>
      <div class="marks">
        <span class="mark" style="top: 15px; left: 70px;">40</span>
        <span class="mark" style="bottom: 1px; left: 70px;">140</span>
        <span class="mark" style="top: 75px; left: 15px;">190</span>
        <span class="mark" style="top: 75px; right: 5px;">90</span>
        <span class="mark" style="top: 31px; left: 31px;">215</span>
        <span class="mark" style="top: 31px; right: 20px;">65</span>
        <span class="mark" style="bottom: 20px; left: 31px;">165</span>
        <span class="mark" style="bottom: 20px; right: 20px;">115</span>
      </div>
    </div>
  </div>
  <div class="row center">
    <button class="btn" data-amount="-1">-1</button>
    <button class="btn" data-amount="1">+1</button>
    <select id="beatsPerMeasure">
      <option value="2">2/4</option>
      <option value="3">3/4</option>
      <option value="4" selected>4/4</option>
      <option value="6">6/8</option>
    </select>
  </div>
</div>`,
    }));
    new Timer();
    new Metronome();
    
    const arr1 = parseHTML(`<br><p class="action" data-action="attack_success">(1) 任务完成</p><p class="action" data-action="attack_fail">(2) 任务失败 / 不小心去了</p>`)
    for (const i of arr1) $('section:last-child .box').appendChild(i);
    setTimeout(updateSectionHeight, 100);
  }
  function beAttack() {
    
  }


  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('disabled')) return;
    let t, action, arg;
    switch(true) {
      // 继续游戏
      case !!e.target.closest('#section-title_screen .btn.continue'):
        if (save.section !== undefined) switchSection(save.section);
        else alert('自动存档为空')
        return;
      // 从头开始
      case !!e.target.closest('#section-title_screen .btn.start'):
        if (save.section !== undefined && !confirm('该操作将会覆盖自动存档，是否继续？')) return;
        save = {};
        switchSection(0);
        return;
      
      // 操作
      case !!(t = e.target.closest('.action, .btn')):
        executeAction.apply(t);
        break;
      
      // 点击 section
      case !!(t = e.target.closest('section')):
        let section = parseInt(t.getAttribute('data-section'));
        if (!t.querySelector('.action, .controls, .dice') && !t.closest('dialog')) {
          switchSection(section + 1);
        }
        return;
    }
  });
  /**
   * 骰子事件
   */
  document.addEventListener('dice', (e) => {
    if (e.target.classList.contains('disabled') || e.target.classList.contains('disabled_dice')) return;
    let dice = e.detail.dice;
    e.target.classList.add('disabled');
    let action = e.target.getAttribute('data-action');
    if (action && action != 'show_action') {
      save.history.push({
        type: 'dice',
        action: action,
        dice: dice,
      });
      setSave();
    }
    switch (action) {
      case 'show_action':
        e.target.parentElement.querySelector('.action').style.display = '';
        break;
      case 'random_camp':
        if (dice <= 3) {
          change_camp(1);
        } else {
          change_camp(2);
        }
        $('#dice_race').classList.remove('disabled');
        if (save.race) showRace();
        break;
      // 职业
      case 'random_race':
        change_race(dice);
        break;
      // 敌人 
      case 'random_enemy':
        showEnemy(dice);
        break;
      // 攻击敌人
      case 'attack_enemy':
        attackEnemy(dice);
        break;
    }
  });
  /**
   * input 改变
   */
  document.addEventListener('change', (e) => {
    if (e.target.id == 'map_show_reverse') {
      if (e.target.checked) {
        setValue('map_show_reverse', '1');
        $('.container').classList.add('map_show_reverse');
      } else {
        setValue('map_show_reverse', '0');
        $('.container').classList.remove('map_show_reverse');
      }
      return;
    }
    if (e.target.id == 'status_show_reverse') {
      if (e.target.checked) {
        setValue('status_show_reverse', '1');
        $('.wrapper').classList.add('status_show_reverse');
      } else {
        setValue('status_show_reverse', '0');
        $('.wrapper').classList.remove('status_show_reverse');
      }
      return;
    }
  });
  
});
