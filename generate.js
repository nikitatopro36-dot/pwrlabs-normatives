#!/usr/bin/env node
/**
 * PWR Нормативы — генератор SEO-страниц
 * Запуск: node generate.js
 * Создаёт ~3000 HTML-страниц в папке normativy/
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://nikitatopro36-dot.github.io/pwrlabs-normatives';
const OUT_DIR = path.join(__dirname, 'normativy');

// ─── ДАННЫЕ ─────────────────────────────────────────────────────────────────
const D = {
  bench:{
    m:{
      'ФПР (IPF)':{note:'Жим лёжа классический · ЕВСК 2022–2026 · Официальный',src:'ФПР ЕВСК 2022–2026, приказ Минспорта №1255 (19.12.2022, ред. 24.01.2024)',
        ranks:['МСМК','МС','КМС','I','II','III','I(ю)','II(ю)','III(ю)'],
        rows:[
          {w:'до 59',v:[180,145,120,105,95,85,72.5,65,57.5]},
          {w:'до 66',v:[215,180,135,120,105,92.5,80,72.5,65]},
          {w:'до 74',v:[240,205,155,135,120,112.5,95,85,77.5]},
          {w:'до 83',v:[270,225,175,150,135,122.5,105,95,85]},
          {w:'до 93',v:[297.5,245,195,165,150,135,115,102.5,92.5]},
          {w:'до 105',v:[315,260,210,180,160,145,122.5,110,100]},
          {w:'до 120',v:[330,275,225,190,170,155,132.5,120,107.5]},
          {w:'120+',v:[345,290,240,205,180,165,140,127.5,115]},
        ]},
      'WRPF':{note:'Жим лёжа без экипировки · WRPF · с допинг контролем · Мужчины',src:'WRPF — wrpf.pro/normativy, сверено с frs24.ru',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[110,95,82.5,75,67.5,57.5]},
          {w:'до 56',v:[120,102.5,90,80,72.5,62.5]},
          {w:'до 60',v:[127.5,112.5,97.5,87.5,77.5,67.5]},
          {w:'до 67.5',v:[142.5,125,107.5,97.5,87.5,75]},
          {w:'до 75',v:[155,135,117.5,105,95,82.5]},
          {w:'до 82.5',v:[167.5,145,127.5,112.5,102.5,87.5]},
          {w:'до 90',v:[175,152.5,132.5,120,107.5,92.5]},
          {w:'до 100',v:[185,162.5,140,125,112.5,97.5]},
          {w:'до 110',v:[195,167.5,147.5,132.5,117.5,100]},
          {w:'до 125',v:[202.5,177.5,152.5,137.5,122.5,105]},
          {w:'до 140',v:[210,182.5,157.5,142.5,127.5,110]},
          {w:'140+',v:[215,187.5,162.5,145,130,112.5]},
        ]},
      'НАП':{note:'Жим лёжа без экипировки · НАП · с допинг контролем · Мужчины',src:'НАП — napdv.com, сводная таблица frs24.ru',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[110,95,82.5,72.5,65,57.5]},
          {w:'до 56',v:[122.5,105,92.5,80,70,62.5]},
          {w:'до 60',v:[130,115,100,87.5,77.5,67.5]},
          {w:'до 67.5',v:[145,127.5,110,100,87.5,77.5]},
          {w:'до 75',v:[157.5,137.5,120,107.5,97.5,85]},
          {w:'до 82.5',v:[170,147.5,130,115,102.5,90]},
          {w:'до 90',v:[177.5,155,135,120,107.5,92.5]},
          {w:'до 100',v:[187.5,162.5,142.5,125,110,97.5]},
          {w:'до 110',v:[195,167.5,147.5,130,115,100]},
          {w:'до 125',v:[202.5,175,155,135,120,105]},
          {w:'до 140',v:[207.5,180,157.5,140,122.5,107.5]},
          {w:'140+',v:[212.5,182.5,162.5,142.5,125,110]},
        ]},
      'СПР':{note:'Жим лёжа классический · СПР · с допинг контролем · Мужчины',src:'СПР — russia-powerlifting.ru',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[110,95,82.5,75,67.5,57.5]},
          {w:'до 56',v:[120,102.5,90,80,72.5,62.5]},
          {w:'до 60',v:[127.5,112.5,97.5,87.5,77.5,67.5]},
          {w:'до 67.5',v:[142.5,125,107.5,97.5,87.5,75]},
          {w:'до 75',v:[155,135,117.5,105,95,82.5]},
          {w:'до 82.5',v:[167.5,145,127.5,112.5,102.5,87.5]},
          {w:'до 90',v:[175,152.5,132.5,120,107.5,92.5]},
          {w:'до 100',v:[185,162.5,140,125,112.5,97.5]},
          {w:'до 110',v:[195,167.5,147.5,132.5,117.5,100]},
          {w:'до 125',v:[202.5,177.5,152.5,137.5,122.5,105]},
          {w:'до 140',v:[210,182.5,157.5,142.5,127.5,110]},
          {w:'140+',v:[215,187.5,162.5,145,130,112.5]},
        ]},
    },
    f:{
      'ФПР (IPF)':{note:'Жим лёжа классический · ЕВСК 2022–2026 · Женщины',src:'ФПР ЕВСК 2022–2026, приказ Минспорта №1255',
        ranks:['МСМК','МС','КМС','I','II','III','I(ю)','II(ю)','III(ю)'],
        rows:[
          {w:'до 43',v:[null,null,57.5,50,45,40,35,30,25]},
          {w:'до 47',v:[100,82.5,65,55,50,45,40,35,30]},
          {w:'до 52',v:[112.5,95,72.5,60,55,50,45,40,35]},
          {w:'до 57',v:[122.5,102.5,80,67.5,60,55,50,45,40]},
          {w:'до 63',v:[132.5,112.5,90,75,67.5,60,55,50,45]},
          {w:'до 69',v:[140,122.5,95,80,72.5,65,60,55,50]},
          {w:'до 76',v:[150,130,100,85,75,67.5,62.5,57.5,52.5]},
          {w:'до 84',v:[157.5,137.5,105,90,80,72.5,65,60,55]},
          {w:'84+',v:[172.5,145,112.5,95,85,77.5,70,65,60]},
        ]},
      'WRPF':{note:'Жим лёжа без экипировки · WRPF · Женщины',src:'WRPF — wrpf.pro/normativy',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 44',v:[55,47.5,40,37.5,32.5,27.5]},
          {w:'до 48',v:[60,52.5,45,40,37.5,32.5]},
          {w:'до 52',v:[67.5,57.5,50,45,40,35]},
          {w:'до 56',v:[72.5,62.5,55,47.5,42.5,37.5]},
          {w:'до 60',v:[77.5,67.5,57.5,52.5,47.5,40]},
          {w:'до 67.5',v:[85,75,65,57.5,52.5,45]},
          {w:'до 75',v:[92.5,80,70,62.5,57.5,47.5]},
          {w:'до 82.5',v:[97.5,85,75,67.5,60,52.5]},
          {w:'до 90',v:[102.5,90,77.5,70,62.5,55]},
          {w:'90+',v:[107.5,92.5,80,72.5,65,57.5]},
        ]},
      'НАП':{note:'Жим лёжа без экипировки · НАП · Женщины',src:'НАП — napdv.com',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 44',v:[55,50,42.5,40,35,30]},
          {w:'до 48',v:[62.5,55,47.5,42.5,37.5,32.5]},
          {w:'до 52',v:[70,60,52.5,45,40,35]},
          {w:'до 56',v:[72.5,65,57.5,50,45,37.5]},
          {w:'до 60',v:[77.5,70,60,52.5,47.5,40]},
          {w:'до 67.5',v:[85,72.5,65,57.5,50,42.5]},
          {w:'до 75',v:[90,77.5,70,60,52.5,45]},
          {w:'до 82.5',v:[95,80,72.5,62.5,55,47.5]},
          {w:'до 90',v:[97.5,82.5,75,65,57.5,50]},
          {w:'90+',v:[100,85,77.5,67.5,60,52.5]},
        ]},
      'СПР':{note:'Жим лёжа классический · СПР · Женщины',src:'СПР — russia-powerlifting.ru',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 44',v:[55,47.5,40,37.5,32.5,27.5]},
          {w:'до 48',v:[60,52.5,45,40,37.5,32.5]},
          {w:'до 52',v:[67.5,57.5,50,45,40,35]},
          {w:'до 56',v:[72.5,62.5,55,47.5,42.5,37.5]},
          {w:'до 60',v:[77.5,67.5,57.5,52.5,47.5,40]},
          {w:'до 67.5',v:[85,75,65,57.5,52.5,45]},
          {w:'до 75',v:[92.5,80,70,62.5,57.5,47.5]},
          {w:'до 82.5',v:[97.5,85,75,67.5,60,52.5]},
          {w:'до 90',v:[102.5,90,77.5,70,62.5,55]},
          {w:'90+',v:[107.5,92.5,80,72.5,65,57.5]},
        ]},
    }
  },
  squat:{
    m:{
      'ФПР — троеборье':{note:'⚠ В ФПР нет отдельных нормативов на присед.',src:'',nodata:true},
      'WRPF':{note:'Приседания без экипировки · WRPF · Мужчины',src:'WRPF — wrpf.pro/normativy',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[162.5,140,120,102.5,92.5,77.5]},
          {w:'до 56',v:[175,150,130,112.5,102.5,85]},
          {w:'до 60',v:[187.5,160,137.5,120,107.5,92.5]},
          {w:'до 67.5',v:[207.5,180,155,135,122.5,102.5]},
          {w:'до 75',v:[222.5,192.5,167.5,145,132.5,112.5]},
          {w:'до 82.5',v:[235,205,175,152.5,140,117.5]},
          {w:'до 90',v:[247.5,215,187.5,162.5,147.5,125]},
          {w:'до 100',v:[260,225,195,170,155,132.5]},
          {w:'до 110',v:[267.5,232.5,200,175,160,137.5]},
          {w:'до 125',v:[280,242.5,210,185,170,145]},
          {w:'до 140',v:[287.5,250,217.5,190,175,150]},
          {w:'140+',v:[295,255,222.5,195,180,155]},
        ]},
      'НАП':{note:'Приседания без экипировки · НАП · Мужчины',src:'НАП — napdv.com',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[155,135,127.5,115,97.5,82.5]},
          {w:'до 56',v:[165,145,135,122.5,105,87.5]},
          {w:'до 60',v:[177.5,155,147.5,132.5,112.5,92.5]},
          {w:'до 67.5',v:[202.5,175,167.5,147.5,125,105]},
          {w:'до 75',v:[225,195,185,165,135,115]},
          {w:'до 82.5',v:[240,207.5,197.5,180,147.5,125]},
          {w:'до 90',v:[257.5,222.5,210,190,157.5,135]},
          {w:'до 100',v:[272.5,237.5,225,202.5,170,142.5]},
          {w:'до 110',v:[277.5,242.5,232.5,205,172.5,150]},
          {w:'до 125',v:[285,250,242.5,215,180,157.5]},
          {w:'до 140',v:[292.5,257.5,245,217.5,182.5,165]},
          {w:'140+',v:[300,265,247.5,220,185,167.5]},
        ]},
      'СПР':{note:'Приседания классические · СПР · Мужчины',src:'СПР — russia-powerlifting.ru',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 60',v:[240,200,162.5,132.5,107.5,82.5]},
          {w:'до 67.5',v:[270,225,182.5,150,122.5,95]},
          {w:'до 75',v:[300,252.5,205,170,140,107.5]},
          {w:'до 82.5',v:[330,277.5,227.5,190,157.5,122.5]},
          {w:'до 90',v:[362.5,305,252.5,212.5,175,137.5]},
          {w:'до 100',v:[395,332.5,275,232.5,192.5,150]},
          {w:'до 110',v:[427.5,360,300,252.5,210,165]},
          {w:'110+',v:[465,392.5,327.5,275,230,180]},
        ]},
    },
    f:{
      'WRPF':{note:'Приседания без экипировки · WRPF · Женщины',src:'WRPF — wrpf.pro/normativy',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 44',v:[95,80,67.5,60,52.5,40]},
          {w:'до 48',v:[107.5,90,77.5,65,57.5,45]},
          {w:'до 52',v:[115,97.5,82.5,72.5,62.5,50]},
          {w:'до 56',v:[125,105,90,77.5,67.5,55]},
          {w:'до 60',v:[130,112.5,95,82.5,72.5,60]},
          {w:'до 67.5',v:[140,120,102.5,90,80,65]},
          {w:'до 75',v:[150,127.5,107.5,95,82.5,67.5]},
          {w:'до 82.5',v:[155,135,115,100,87.5,72.5]},
          {w:'до 90',v:[162.5,137.5,117.5,102.5,90,75]},
          {w:'90+',v:[167.5,142.5,122.5,107.5,92.5,77.5]},
        ]},
      'НАП':{note:'Приседания без экипировки · НАП · Женщины',src:'НАП — napdv.com',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 44',v:[100,87.5,77.5,70,60,55]},
          {w:'до 48',v:[107.5,97.5,85,75,67.5,60]},
          {w:'до 52',v:[117.5,105,92.5,82.5,72.5,65]},
          {w:'до 56',v:[125,112.5,97.5,87.5,77.5,67.5]},
          {w:'до 60',v:[132.5,117.5,105,92.5,80,72.5]},
          {w:'до 67.5',v:[147.5,127.5,117.5,102.5,87.5,77.5]},
          {w:'до 75',v:[160,137.5,122.5,110,95,85]},
          {w:'до 82.5',v:[172.5,145,127.5,115,100,87.5]},
          {w:'до 90',v:[182.5,157.5,140,125,105,95]},
          {w:'90+',v:[185,162.5,150,135,110,97.5]},
        ]},
      'СПР':{note:'Приседания классические · СПР · Женщины',src:'СПР — russia-powerlifting.ru',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[150,127.5,105,87.5,72.5,57.5]},
          {w:'до 57',v:[167.5,142.5,117.5,100,82.5,65]},
          {w:'до 63',v:[187.5,160,135,115,97.5,77.5]},
          {w:'до 69',v:[210,180,155,132.5,115,92.5]},
          {w:'до 76',v:[235,202.5,175,152.5,132.5,107.5]},
          {w:'84+',v:[270,235,205,180,157.5,130]},
        ]},
    }
  },
  dead:{
    m:{
      'WRPF':{note:'Становая тяга без экипировки · WRPF · Мужчины',src:'WRPF — wrpf.pro/normativy',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[177.5,155,135,117.5,107.5,92.5]},
          {w:'до 56',v:[190,165,145,127.5,117.5,100]},
          {w:'до 60',v:[202.5,175,152.5,135,122.5,107.5]},
          {w:'до 67.5',v:[222.5,195,170,150,137.5,117.5]},
          {w:'до 75',v:[237.5,207.5,182.5,160,147.5,127.5]},
          {w:'до 82.5',v:[250,220,190,167.5,155,132.5]},
          {w:'до 90',v:[262.5,230,202.5,177.5,162.5,140]},
          {w:'до 100',v:[275,240,210,185,170,147.5]},
          {w:'до 110',v:[282.5,247.5,215,190,175,152.5]},
          {w:'до 125',v:[295,257.5,225,200,182.5,160]},
          {w:'до 140',v:[302.5,265,232.5,202.5,190,162.5]},
          {w:'140+',v:[310,270,237.5,207.5,197.5,165]},
        ]},
      'НАП':{note:'Становая тяга без экипировки · НАП · Мужчины',src:'НАП — napdv.com',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[177.5,155,135,117.5,107.5,92.5]},
          {w:'до 56',v:[190,165,145,127.5,117.5,100]},
          {w:'до 60',v:[202.5,175,152.5,135,122.5,107.5]},
          {w:'до 67.5',v:[220,192.5,167.5,147.5,135,115]},
          {w:'до 75',v:[235,205,180,157.5,145,125]},
          {w:'до 82.5',v:[247.5,217.5,187.5,165,152.5,130]},
          {w:'до 90',v:[257.5,225,197.5,172.5,157.5,135]},
          {w:'до 100',v:[270,235,205,180,165,142.5]},
          {w:'до 110',v:[277.5,242.5,210,185,170,147.5]},
          {w:'до 125',v:[287.5,250,217.5,192.5,177.5,152.5]},
          {w:'до 140',v:[295,257.5,225,195,180,155]},
          {w:'140+',v:[302.5,262.5,227.5,200,185,157.5]},
        ]},
      'СПР':{note:'Становая тяга · СПР · Мужчины',src:'СПР — russia-powerlifting.ru',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 60',v:[272.5,230,187.5,155,127.5,100]},
          {w:'до 67.5',v:[305,257.5,212.5,177.5,147.5,115]},
          {w:'до 75',v:[337.5,285,237.5,200,167.5,132.5]},
          {w:'до 82.5',v:[372.5,315,265,225,190,152.5]},
          {w:'до 90',v:[407.5,347.5,295,252.5,212.5,170]},
          {w:'до 100',v:[445,382.5,325,277.5,235,190]},
          {w:'до 110',v:[482.5,415,355,305,260,210]},
          {w:'110+',v:[527.5,455,390,337.5,285,232.5]},
        ]},
      'ФПР — нет норм':{note:'⚠ В ФПР (IPF) нет отдельных нормативов на становую тягу',src:'',nodata:true},
    },
    f:{
      'WRPF':{note:'Становая тяга без экипировки · WRPF · Женщины',src:'WRPF — wrpf.pro/normativy',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 44',v:[115,100,87.5,80,72.5,62.5]},
          {w:'до 48',v:[127.5,110,97.5,85,77.5,65]},
          {w:'до 52',v:[135,117.5,102.5,92.5,85,70]},
          {w:'до 56',v:[145,125,110,97.5,87.5,75]},
          {w:'до 60',v:[150,132.5,115,102.5,92.5,80]},
          {w:'до 67.5',v:[160,140,122.5,110,100,85]},
          {w:'до 75',v:[170,147.5,127.5,115,102.5,87.5]},
          {w:'до 82.5',v:[175,155,135,120,107.5,92.5]},
          {w:'до 90',v:[182.5,157.5,137.5,122.5,110,95]},
          {w:'90+',v:[187.5,162.5,142.5,127.5,112.5,97.5]},
        ]},
      'НАП':{note:'Становая тяга без экипировки · НАП · Женщины',src:'НАП — napdv.com',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 44',v:[117.5,102.5,87.5,77.5,67.5,60]},
          {w:'до 48',v:[125,110,95,85,75,65]},
          {w:'до 52',v:[135,117.5,102.5,90,80,70]},
          {w:'до 56',v:[142.5,125,107.5,95,85,75]},
          {w:'до 60',v:[150,130,112.5,100,90,80]},
          {w:'до 67.5',v:[160,137.5,120,105,95,85]},
          {w:'до 75',v:[167.5,145,127.5,112.5,100,87.5]},
          {w:'до 82.5',v:[172.5,152.5,132.5,115,105,92.5]},
          {w:'до 90',v:[180,155,135,120,107.5,95]},
          {w:'90+',v:[182.5,157.5,137.5,122.5,112.5,97.5]},
        ]},
      'СПР':{note:'Становая тяга · СПР · Женщины',src:'СПР — russia-powerlifting.ru',
        ranks:['МСМК','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[162.5,137.5,115,97.5,82.5,67.5]},
          {w:'до 57',v:[182.5,155,130,110,95,77.5]},
          {w:'до 63',v:[205,175,150,127.5,107.5,90]},
          {w:'до 69',v:[230,197.5,170,147.5,127.5,105]},
          {w:'до 76',v:[255,220,190,165,145,120]},
          {w:'84+',v:[290,252.5,220,192.5,170,142.5]},
        ]},
    }
  },
  classic:{
    m:{
      'ФПР (IPF)':{note:'Сумма троеборья классического · ЕВСК 2022–2026 · Мужчины',src:'ФПР ЕВСК 2022–2026, приказ Минспорта №1255 (19.12.2022)',
        ranks:['МСМК','МС','КМС','I','II','III','I(ю)','II(ю)','III(ю)'],
        rows:[
          {w:'до 53',v:[null,null,340,300,265,240,215,200,185]},
          {w:'до 59',v:[545,465,385,340,300,275,245,225,205]},
          {w:'до 66',v:[620,525,425,380,335,305,270,245,215]},
          {w:'до 74',v:[685,580,460,415,365,325,295,260,230]},
          {w:'до 83',v:[750,640,500,455,400,350,320,290,255]},
          {w:'до 93',v:[785,690,540,480,430,385,345,315,275]},
          {w:'до 105',v:[822.5,720,585,510,460,415,370,330,300]},
          {w:'до 120',v:[855,770,635,555,505,455,395,355,325]},
          {w:'120+',v:[925,815,690,585,525,485,425,370,345]},
        ]},
      'WRPF (тест)':{note:'Сумма троеборья без экипировки · WRPF тестируемый дивизион · Мужчины',src:'WRPF — wrpf.pro/normativy',
        ranks:['Elite','Master','КМС','I р','II р','III р'],
        rows:[
          {w:'до 52',v:[437.5,382.5,345,307.5,270,232.5]},
          {w:'до 56',v:[475,415,372.5,332.5,292.5,250]},
          {w:'до 60',v:[510,445,400,355,312.5,267.5]},
          {w:'до 67.5',v:[567.5,495,445,397.5,347.5,297.5]},
          {w:'до 75',v:[622.5,542.5,490,435,382.5,330]},
          {w:'до 82.5',v:[662.5,577.5,520,465,407.5,350]},
          {w:'до 90',v:[697.5,607.5,547.5,487.5,427.5,367.5]},
          {w:'до 100',v:[735,640,577.5,512.5,450,387.5]},
          {w:'до 110',v:[767.5,670,605,540,472.5,407.5]},
          {w:'до 125',v:[802.5,700,632.5,562.5,495,425]},
          {w:'до 140',v:[827.5,722.5,650,580,510,440]},
          {w:'140+',v:[847.5,740,667.5,595,522.5,450]},
        ]},
      'НАП (тест)':{note:'Сумма троеборья без экипировки · НАП · Мужчины',src:'НАП — napdv.com',
        ranks:['Элита','МС','КМС','I','II','III'],
        rows:[
          {w:'до 52',v:[437.5,382.5,345,305,270,232.5]},
          {w:'до 56',v:[475,415,372.5,330,292.5,250]},
          {w:'до 60',v:[510,445,400,355,312.5,267.5]},
          {w:'до 67.5',v:[567.5,495,445,395,347.5,297.5]},
          {w:'до 75',v:[617.5,537.5,485,430,377.5,325]},
          {w:'до 82.5',v:[657.5,572.5,515,460,402.5,345]},
          {w:'до 90',v:[692.5,602.5,542.5,482.5,422.5,362.5]},
          {w:'до 100',v:[730,635,572.5,507.5,445,382.5]},
          {w:'до 110',v:[757.5,660,590,520,457.5,397.5]},
          {w:'до 125',v:[792.5,690,615,542.5,477.5,415]},
          {w:'до 140',v:[817.5,710,625,550,485,427.5]},
          {w:'140+',v:[835,722.5,635,560,492.5,435]},
        ]},
    },
    f:{
      'ФПР (IPF)':{note:'Сумма троеборья классического · ЕВСК 2022–2026 · Женщины',src:'ФПР ЕВСК 2022–2026, приказ Минспорта №1255',
        ranks:['МСМК','МС','КМС','I','II','III','I(ю)','II(ю)','III(ю)'],
        rows:[
          {w:'до 43',v:[null,null,170,145,125,115,105,97.5,90]},
          {w:'до 47',v:[335,270,210,170,145,125,115,105,97.5]},
          {w:'до 52',v:[370,300,245,195,170,145,125,115,105]},
          {w:'до 57',v:[390,325,275,205,185,165,145,125,115]},
          {w:'до 63',v:[422.5,350,305,230,200,180,160,140,125]},
          {w:'до 69',v:[440,365,320,252.5,222.5,190,170,150,137.5]},
          {w:'до 76',v:[457.5,385,340,277.5,242.5,210,190,170,150]},
          {w:'до 84',v:[475,395,350,295,255,220,200,180,160]},
          {w:'84+',v:[525,420,375,317.5,285,250,220,200,180]},
        ]},
      'WRPF (тест)':{note:'Сумма троеборья без экипировки · WRPF · Женщины',src:'WRPF — wrpf.pro/normativy',
        ranks:['Elite','Master','КМС','I р','II р','III р'],
        rows:[
          {w:'до 44',v:[255,220,187.5,172.5,152.5,127.5]},
          {w:'до 48',v:[282.5,242.5,210,182.5,167.5,137.5]},
          {w:'до 52',v:[305,262.5,227.5,202.5,182.5,150]},
          {w:'до 56',v:[330,282.5,247.5,217.5,192.5,165]},
          {w:'до 60',v:[345,302.5,260,230,207.5,177.5]},
          {w:'до 67.5',v:[370,325,280,250,225,190]},
          {w:'до 75',v:[397.5,342.5,295,265,235,197.5]},
          {w:'до 82.5',v:[417.5,367.5,320,282.5,252.5,217.5]},
          {w:'до 90',v:[435,375,325,290,260,225]},
          {w:'90+',v:[450,387.5,337.5,302.5,267.5,230]},
        ]},
      'НАП (тест)':{note:'Сумма троеборья без экипировки · НАП · Женщины',src:'НАП — napdv.com',
        ranks:['Элита','МС','КМС','I','II','III'],
        rows:[
          {w:'до 44',v:[260,227.5,205,182.5,160,137.5]},
          {w:'до 48',v:[287.5,250,225,200,175,152.5]},
          {w:'до 52',v:[310,270,240,212.5,185,165]},
          {w:'до 56',v:[332.5,290,257.5,225,200,175]},
          {w:'до 60',v:[355,307.5,277.5,245,215,187.5]},
          {w:'до 67.5',v:[387.5,337.5,302.5,265,232.5,205]},
          {w:'до 75',v:[415,360,320,282.5,247.5,217.5]},
          {w:'до 82.5',v:[437.5,377.5,332.5,292.5,260,227.5]},
          {w:'до 90',v:[455,395,350,310,270,240]},
          {w:'90+',v:[465,405,365,325,282.5,245]},
        ]},
    }
  },
  equipped:{
    m:{
      'ФПР (IPF)':{note:'Сумма троеборья с экипировкой · ЕВСК 2022–2026 · Мужчины',src:'ФПР ЕВСК 2022–2026, приказ Минспорта №1255',
        ranks:['МСМК','МС','КМС','I','II','III','I(ю)','II(ю)','III(ю)'],
        rows:[
          {w:'до 53',v:[null,null,410,325,282.5,260,232.5,215,195]},
          {w:'до 59',v:[635,540,455,362.5,315,290,260,240,212.5]},
          {w:'до 66',v:[720,595,510,402.5,350,320,287.5,257.5,227.5]},
          {w:'до 74',v:[785,675,537.5,440,385,352.5,317.5,280,247.5]},
          {w:'до 83',v:[850,775,582.5,482.5,422.5,387.5,352.5,307.5,277.5]},
          {w:'до 93',v:[925,800,610,520,465,412.5,382.5,340,307.5]},
          {w:'до 105',v:[970,840,645,552.5,500,460,397.5,355,330]},
          {w:'до 120',v:[1005,875,687.5,600,530,497.5,422.5,372.5,347.5]},
          {w:'120+',v:[1035,890,735,617.5,545,510,455,390,372.5]},
        ]},
    },
    f:{
      'ФПР (IPF)':{note:'Сумма троеборья с экипировкой · ЕВСК 2022–2026 · Женщины',src:'ФПР ЕВСК 2022–2026, приказ Минспорта №1255',
        ranks:['МСМК','МС','КМС','I','II','III','I(ю)','II(ю)','III(ю)'],
        rows:[
          {w:'до 43',v:[null,null,242.5,175,150,137.5,122.5,112.5,97.5]},
          {w:'до 47',v:[405,310,262.5,190,165,150,135,122.5,105]},
          {w:'до 52',v:[435,365,290,210,182.5,167.5,147.5,135,117.5]},
          {w:'до 57',v:[485,390,312.5,227.5,200,182.5,162.5,147.5,127.5]},
          {w:'до 63',v:[540,420,337.5,252.5,220,202.5,180,162.5,142.5]},
          {w:'до 69',v:[560,435,350,275,237.5,215,190,175,152.5]},
          {w:'до 76',v:[580,450,375,300,265,235,205,190,167.5]},
          {w:'до 84',v:[600,465,405,327.5,285,260,220,205,177.5]},
          {w:'84+',v:[620,480,422.5,352.5,320,285,235,217.5,192.5]},
        ]},
    }
  }
};

// ─── УТИЛИТЫ ────────────────────────────────────────────────────────────────
const DISC_RU = {bench:'жим лёжа',squat:'присед',dead:'становая тяга',classic:'троеборье классика',equipped:'троеборье экипировка'};
const DISC_SHORT = {bench:'жим',squat:'присед',dead:'тяга',classic:'классика',equipped:'экипировка'};
const DISC_SLUG = {bench:'zhim',squat:'prised',dead:'tyaga',classic:'klassika',equipped:'ekipirovka'};
const DISC_HASH = {bench:'zhim',squat:'prised',dead:'tyaga',classic:'klassika',equipped:'ekipirovka'};
const FED_SLUG = {
  'ФПР (IPF)':'fpr','WRPF':'wrpf','НАП':'nap','СПР':'spr',
  'ФПР — троеборье':'fpr','ФПР — нет норм':'fpr',
  'WRPF (тест)':'wrpf','НАП (тест)':'nap',
};
const FED_SHORT = {
  'ФПР (IPF)':'ФПР','WRPF':'WRPF','НАП':'НАП','СПР':'СПР',
  'ФПР — троеборье':'ФПР','ФПР — нет норм':'ФПР',
  'WRPF (тест)':'WRPF','НАП (тест)':'НАП',
};
const SEX_SLUG = {m:'muzhchiny',f:'zhenshchiny'};
const SEX_RU = {m:'мужчины',f:'женщины'};

function wSlug(w){
  return w
    .replace(/до\s*/g,'do-')
    .replace(/\+/g,'plus')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-')
    .replace(/^-|-$/g,'');
}
function slug(disc,fed,sex,w){
  return `${DISC_SLUG[disc]}-${FED_SLUG[fed]}-${SEX_SLUG[sex]}-${wSlug(w)}-kg.html`;
}
function fmtV(v){ return v===null?'—':`${v} кг`; }
function css(){
  return `<style>
:root{--bg:#010608;--panel:#011820;--accent:#00ddb4;--text:#dff5f0;--muted:#7a9aa0;--line:#0a2530}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:0;padding:0;line-height:1.55}
.wrap{max-width:760px;margin:0 auto;padding:16px 16px 40px}
header.top{padding:14px 16px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px}
header.top a{color:var(--accent);text-decoration:none;font-weight:700}
nav.crumbs{font-size:12px;color:var(--muted);margin:14px 0}
nav.crumbs a{color:var(--muted);text-decoration:none}
nav.crumbs a:hover{color:var(--accent)}
h1{font-size:21px;line-height:1.3;margin:0 0 10px}
p.lead{color:#b9d8d4;font-size:14px;margin:0 0 18px}
table{width:100%;border-collapse:collapse;margin:14px 0 22px;font-size:14px}
th,td{padding:9px 10px;border-bottom:1px solid var(--line);text-align:left}
th{color:var(--muted);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.03em}
td.val{font-weight:700;color:var(--accent);text-align:right}
tr.na td.val{color:var(--muted);font-weight:400}
tr.highlight{background:rgba(0,221,180,.08)}
.note{font-size:12px;color:var(--muted);margin:-6px 0 18px}
.cta{display:block;background:var(--accent);color:#012018;text-align:center;padding:13px;border-radius:10px;font-weight:700;text-decoration:none;margin:20px 0}
.cta:hover{opacity:.9}
h2{font-size:16px;margin:26px 0 10px;color:#cfeee8}
.faq-item{margin-bottom:14px}
.faq-q{font-weight:600;font-size:14px;color:var(--text)}
.faq-a{font-size:13px;color:#b9d8d4;margin-top:3px}
.links{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 24px}
.links a{font-size:12px;color:var(--text);background:var(--panel);border:1px solid var(--line);padding:6px 10px;border-radius:20px;text-decoration:none}
.links a:hover{border-color:var(--accent);color:var(--accent)}
.badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;background:rgba(0,221,180,.15);color:var(--accent);margin-left:6px}
.src{font-size:11px;color:var(--muted);margin-top:26px;border-top:1px solid var(--line);padding-top:12px}
footer{font-size:11px;color:var(--muted);text-align:center;padding:20px;border-top:1px solid var(--line)}
footer a{color:var(--accent);text-decoration:none}
</style>`;
}
function header(){ return `<header class="top"><a href="../">🏋️ PWR Нормативы</a></header>`; }
function footer(){ return `<footer>© PWR Нормативы · Telegram-бот <a href="https://t.me/PWRLab_bot" target="_blank">@PWRLAB_bot</a></footer>`; }
function cta(){ return `<a class="cta" href="../">🧮 Открыть полный калькулятор нормативов и разрядов</a>`; }

const allUrls = [];

function writeFile(filename, html){
  fs.writeFileSync(path.join(OUT_DIR, filename), html, 'utf8');
  allUrls.push(`${BASE_URL}/normativy/${filename}`);
}

// ─── ТИП 1: Таблица для конкретного разряда+вес (1800+ страниц) ─────────────
// Формат: zhim-fpr-muzhchiny-do-83-kg-kms.html
function rankSlug(rank){
  const m = {'МСМК':'msmk','МС':'ms','КМС':'kms','I':'1','II':'2','III':'3',
    'I(ю)':'1yu','II(ю)':'2yu','III(ю)':'3yu',
    'Elite':'elite','Master':'master','I р':'1r','II р':'2r','III р':'3r',
    'Элита':'elita'};
  return m[rank] || rank.toLowerCase().replace(/[^a-z0-9]/g,'');
}

function genRankWeightPages(){
  let count = 0;
  for(const [disc, sexes] of Object.entries(D)){
    for(const [sex, feds] of Object.entries(sexes)){
      for(const [fed, data] of Object.entries(feds)){
        if(data.nodata) continue;
        const {ranks, rows, src} = data;
        const discRu = DISC_RU[disc];
        const fedShort = FED_SHORT[fed];
        const sexRu = SEX_RU[sex];
        const discSlug = DISC_SLUG[disc];
        const fedSlug = FED_SLUG[fed];
        const sexSlug = SEX_SLUG[sex];

        for(const row of rows){
          const {w, v} = row;
          for(let ri = 0; ri < ranks.length; ri++){
            const rank = ranks[ri];
            const val = v[ri];
            if(val === null) continue;

            const rSlug = rankSlug(rank);
            const fname = `${discSlug}-${fedSlug}-${sexSlug}-${wSlug(w)}-kg-${rSlug}.html`;
            const canonUrl = `${BASE_URL}/normativy/${fname}`;
            const parentUrl = `${BASE_URL}/normativy/${slug(disc,fed,sex,w)}`;

            // Соседние разряды
            const prevRank = ri > 0 ? ranks[ri-1] : null;
            const nextRank = ri < ranks.length-1 ? ranks[ri+1] : null;
            const prevVal = prevRank ? v[ri-1] : null;
            const nextVal = nextRank ? v[ri+1] : null;

            // Другие весовые категории для того же разряда
            const otherWeights = rows.filter(r=>r!==row).map(r=>{
              const ov = r.v[ri];
              if(ov===null) return '';
              const href = `${discSlug}-${fedSlug}-${sexSlug}-${wSlug(r.w)}-kg-${rSlug}.html`;
              return `<a href="${href}">${r.w} кг</a>`;
            }).filter(Boolean).join('\n');

            const title = `Норматив ${rank} ${discRu} ${w} кг — ${fedShort}, ${sexRu} | ${val} кг`;
            const desc = `Норматив разряда ${rank} в ${discRu} для весовой категории ${w} кг (${fedShort}, ${sexRu}) — ${val} кг. Узнайте требования к соседним разрядам и весовым категориям.`;

            const faqItems = [
              {q:`Сколько нужно поднять на разряд ${rank} в ${discRu} при весе ${w} кг (${fedShort})?`,
               a:`Для получения разряда ${rank} в ${discRu} весовой категории ${w} кг по нормативам ${fedShort} (${sexRu}) необходимо поднять ${val} кг.`},
            ];
            if(prevRank && prevVal !== null){
              faqItems.push({
                q:`Что выше разряда ${rank} в ${discRu} ${w} кг (${fedShort})?`,
                a:`Следующий (более высокий) разряд после ${rank} — это ${prevRank}, норматив ${prevVal} кг для ${w} кг у ${sexRu} (${fedShort}).`
              });
            }
            if(nextRank && nextVal !== null){
              faqItems.push({
                q:`Что ниже разряда ${rank} в ${discRu} ${w} кг (${fedShort})?`,
                a:`Следующий (более низкий) разряд — ${nextRank}, норматив ${nextVal} кг для ${w} кг у ${sexRu} (${fedShort}).`
              });
            }
            faqItems.push({
              q:`Сколько осталось поднять до разряда ${rank} в ${discRu}, если я жму 80% от нормы (${fedShort}, ${w} кг)?`,
              a:`80% от норматива ${rank} (${val} кг) — это ${Math.round(val*0.8*2)/2} кг. До выполнения разряда останется ${Math.round((val - val*0.8)*2)/2} кг.`
            });

            const faqLd = JSON.stringify({
              "@context":"https://schema.org","@type":"FAQPage",
              "mainEntity": faqItems.map(f=>({
                "@type":"Question","name":f.q,
                "acceptedAnswer":{"@type":"Answer","text":f.a}
              }))
            });
            const breadLd = JSON.stringify({
              "@context":"https://schema.org","@type":"BreadcrumbList",
              "itemListElement":[
                {"@type":"ListItem","position":1,"name":"Главная","item":`${BASE_URL}/`},
                {"@type":"ListItem","position":2,"name":"Все нормативы","item":`${BASE_URL}/normativy/`},
                {"@type":"ListItem","position":3,"name":discRu,"item":`${BASE_URL}/normativy/#${DISC_HASH[disc]}`},
                {"@type":"ListItem","position":4,"name":fedShort,"item":parentUrl},
                {"@type":"ListItem","position":5,"name":`${w} кг`,"item":parentUrl},
                {"@type":"ListItem","position":6,"name":`Разряд ${rank}`}
              ]
            });

            const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonUrl}">
<meta property="og:title" content="Норматив ${rank} ${discRu} ${w} кг — ${fedShort}, ${sexRu}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonUrl}">
<link rel="icon" type="image/png" href="../favicon.png">
<script type="application/ld+json">${faqLd}</script>
<script type="application/ld+json">${breadLd}</script>
${css()}
</head>
<body>
${header()}
<div class="wrap">
<nav class="crumbs">
  <a href="../">Главная</a> /
  <a href="./">Все нормативы</a> /
  <a href="${slug(disc,fed,sex,w)}">${discRu} · ${fedShort} · ${sexRu} · ${w} кг</a> /
  Разряд ${rank}
</nav>
<h1>Норматив <strong>${rank}</strong> — ${discRu} ${w} кг <span class="badge">${fedShort}</span></h1>
<p class="lead">Спортивный норматив разряда <strong>${rank}</strong> в ${discRu} для весовой категории <strong>${w} кг</strong> (${sexRu}) по нормативам <strong>${fedShort}</strong>.</p>

<table>
<thead><tr><th>Параметр</th><th style="text-align:right">Значение</th></tr></thead>
<tbody>
<tr><td>Дисциплина</td><td style="text-align:right">${discRu}</td></tr>
<tr><td>Весовая категория</td><td style="text-align:right">${w} кг</td></tr>
<tr><td>Пол</td><td style="text-align:right">${sexRu}</td></tr>
<tr><td>Федерация</td><td style="text-align:right">${fedShort}</td></tr>
<tr class="highlight"><td><strong>Разряд ${rank}</strong></td><td class="val">${val} кг</td></tr>
${prevRank && prevVal !== null ? `<tr><td>↑ ${prevRank} (выше)</td><td class="val" style="opacity:.7">${prevVal} кг</td></tr>` : ''}
${nextRank && nextVal !== null ? `<tr><td>↓ ${nextRank} (ниже)</td><td class="val" style="opacity:.7">${nextVal} кг</td></tr>` : ''}
</tbody>
</table>
<div class="note">Источник: ${src || fedShort}</div>

${cta()}

<h2>Этот же разряд в других весовых категориях</h2>
<div class="links">
<a href="${slug(disc,fed,sex,w)}">← Полная таблица ${w} кг</a>
${otherWeights}
</div>

<h2>Часто задаваемые вопросы</h2>
${faqItems.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('\n')}

</div>
${footer()}
</body>
</html>`;
            writeFile(fname, html);
            count++;
          }
        }
      }
    }
  }
  console.log(`Тип 1 (разряд+вес): ${count} страниц`);
  return count;
}

// ─── ТИП 2: Сравнение федераций для дисциплины+пол+вес ───────────────────
// Формат: sravnenie-zhim-muzhchiny-do-83-kg.html
function genComparisonPages(){
  let count = 0;
  // Собираем все уникальные комбинации disc+sex+weight из данных
  const combos = new Map(); // key: disc-sex-weight -> {disc,sex,w,feds:[{fed,data}]}
  for(const [disc,sexes] of Object.entries(D)){
    for(const [sex,feds] of Object.entries(sexes)){
      for(const [fed,data] of Object.entries(feds)){
        if(data.nodata) continue;
        for(const row of data.rows){
          const key = `${disc}|${sex}|${row.w}`;
          if(!combos.has(key)) combos.set(key,{disc,sex,w:row.w,feds:[]});
          combos.get(key).feds.push({fed,data,row});
        }
      }
    }
  }

  for(const [,combo] of combos){
    const {disc,sex,w,feds: fedList} = combo;
    if(fedList.length < 2) continue; // нечего сравнивать

    const discRu = DISC_RU[disc];
    const sexRu = SEX_RU[sex];
    const discSlug = DISC_SLUG[disc];
    const sexSlug = SEX_SLUG[sex];
    const fname = `sravnenie-${discSlug}-${sexSlug}-${wSlug(w)}-kg.html`;
    const canonUrl = `${BASE_URL}/normativy/${fname}`;

    // Собираем все уникальные разряды из всех федераций
    const allRanks = [];
    const seen = new Set();
    for(const {data} of fedList){
      for(const r of data.ranks){
        if(!seen.has(r)){ seen.add(r); allRanks.push(r); }
      }
    }

    const fedNames = fedList.map(f=>FED_SHORT[f.fed]).join(' vs ');
    const title = `Сравнение нормативов ${discRu} ${w} кг — ${fedNames}, ${sexRu}`;
    const desc = `Сравнительная таблица нормативов разрядов в ${discRu} весовой категории ${w} кг (${sexRu}): ${fedNames}. Кто требует больше — МСМК, МС, КМС, I, II, III.`;

    // Строки таблицы: для каждого разряда — значения по всем федерациям
    let tableRows = '';
    const faqItems = [];
    for(const rank of allRanks){
      const cells = fedList.map(({fed,data,row})=>{
        const ri = data.ranks.indexOf(rank);
        if(ri===-1) return '<td class="val" style="color:var(--muted)">—</td>';
        const val = row.v[ri];
        return val===null ? '<td class="val" style="color:var(--muted)">—</td>' : `<td class="val">${val} кг</td>`;
      }).join('');

      // Найти максимум для вопроса FAQ
      const vals = fedList.map(({fed,data,row})=>{
        const ri = data.ranks.indexOf(rank);
        if(ri===-1) return null;
        return {fed:FED_SHORT[fed],val:row.v[ri]};
      }).filter(x=>x && x.val!==null);
      if(vals.length >= 2){
        const maxFed = vals.reduce((a,b)=>a.val>b.val?a:b);
        const minFed = vals.reduce((a,b)=>a.val<b.val?a:b);
        if(maxFed.val !== minFed.val){
          faqItems.push({
            q:`Где выше норматив ${rank} в ${discRu} ${w} кг у ${sexRu}?`,
            a:`Самый высокий норматив ${rank} — у ${maxFed.fed} (${maxFed.val} кг), самый низкий — у ${minFed.fed} (${minFed.val} кг).`
          });
        }
      }
      tableRows += `<tr><td>${rank}</td>${cells}</tr>\n`;
    }

    const faqLd = JSON.stringify({
      "@context":"https://schema.org","@type":"FAQPage",
      "mainEntity": faqItems.slice(0,5).map(f=>({
        "@type":"Question","name":f.q,
        "acceptedAnswer":{"@type":"Answer","text":f.a}
      }))
    });
    const breadLd = JSON.stringify({
      "@context":"https://schema.org","@type":"BreadcrumbList",
      "itemListElement":[
        {"@type":"ListItem","position":1,"name":"Главная","item":`${BASE_URL}/`},
        {"@type":"ListItem","position":2,"name":"Все нормативы","item":`${BASE_URL}/normativy/`},
        {"@type":"ListItem","position":3,"name":"Сравнение федераций"},
        {"@type":"ListItem","position":4,"name":`${discRu} · ${w} кг · ${sexRu}`}
      ]
    });

    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonUrl}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonUrl}">
<link rel="icon" type="image/png" href="../favicon.png">
<script type="application/ld+json">${faqLd}</script>
<script type="application/ld+json">${breadLd}</script>
${css()}
</head>
<body>
${header()}
<div class="wrap">
<nav class="crumbs">
  <a href="../">Главная</a> /
  <a href="./">Все нормативы</a> /
  Сравнение федераций / ${discRu} · ${sexRu} · ${w} кг
</nav>
<h1>Нормативы ${discRu} ${w} кг — сравнение федераций <small style="font-size:14px;color:var(--muted)">(${sexRu})</small></h1>
<p class="lead">Сравнительная таблица разрядных нормативов в <strong>${discRu}</strong> для весовой категории <strong>${w} кг</strong> (${sexRu}) по всем федерациям пауэрлифтинга. Узнайте, где легче или сложнее получить каждый разряд.</p>

<table>
<thead><tr><th>Разряд</th>${fedList.map(f=>`<th style="text-align:right">${FED_SHORT[f.fed]}</th>`).join('')}</tr></thead>
<tbody>
${tableRows}
</tbody>
</table>
<div class="note">Данные: ${fedList.map(f=>f.data.src).filter(Boolean).join(' · ')}</div>

${cta()}

${faqItems.length > 0 ? `<h2>Сравнение по разрядам</h2>
${faqItems.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('\n')}` : ''}

<h2>Перейти к полным таблицам</h2>
<div class="links">
${fedList.map(f=>`<a href="${slug(disc,f.fed,sex,w)}">${FED_SHORT[f.fed]} — полная таблица ${w} кг</a>`).join('\n')}
</div>
</div>
${footer()}
</body>
</html>`;
    writeFile(fname, html);
    count++;
  }
  console.log(`Тип 2 (сравнение федераций): ${count} страниц`);
  return count;
}

// ─── ТИП 3: Обратный поиск "сколько это разряд" — по упражнению ──────────
// Страница: какой-razryad-zhim-muzhchiny.html — для заданного упражнения+пол
// Это интерактивный справочник с JS для ввода результата
function genReversePages(){
  let count = 0;
  for(const disc of Object.keys(D)){
    for(const sex of ['m','f']){
      const feds = D[disc][sex];
      if(!feds) continue;
      // Собираем все данные из всех федераций (без nodata)
      const fedDataList = Object.entries(feds).filter(([,d])=>!d.nodata);
      if(fedDataList.length === 0) continue;

      const discRu = DISC_RU[disc];
      const sexRu = SEX_RU[sex];
      const discSlug = DISC_SLUG[disc];
      const sexSlug = SEX_SLUG[sex];
      const fname = `kakoj-razryad-${discSlug}-${sexSlug}.html`;
      const canonUrl = `${BASE_URL}/normativy/${fname}`;

      const title = `Какой разряд в ${discRu} — ${sexRu}? Калькулятор по результату`;
      const desc = `Введите свой результат в ${discRu} и узнайте, какому разряду он соответствует по всем весовым категориям и федерациям (${sexRu}). Быстрый обратный поиск норматива.`;

      // Данные для JS на странице
      const jsData = JSON.stringify(fedDataList.map(([fed,data])=>({
        fed: FED_SHORT[fed],
        ranks: data.ranks,
        rows: data.rows.map(r=>({w:r.w, v:r.v}))
      })));

      const breadLd = JSON.stringify({
        "@context":"https://schema.org","@type":"BreadcrumbList",
        "itemListElement":[
          {"@type":"ListItem","position":1,"name":"Главная","item":`${BASE_URL}/`},
          {"@type":"ListItem","position":2,"name":"Все нормативы","item":`${BASE_URL}/normativy/`},
          {"@type":"ListItem","position":3,"name":`Какой разряд — ${discRu} (${sexRu})`}
        ]
      });

      const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonUrl}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonUrl}">
<link rel="icon" type="image/png" href="../favicon.png">
<script type="application/ld+json">${breadLd}</script>
${css()}
<style>
.rev-form{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}
.rev-form input{background:var(--panel);border:1px solid var(--line);color:var(--text);padding:10px 14px;border-radius:8px;font-size:15px;width:160px}
.rev-form button{background:var(--accent);color:#012018;border:none;padding:10px 22px;border-radius:8px;font-weight:700;cursor:pointer;font-size:15px}
.rev-form button:hover{opacity:.9}
#result-block{margin-top:18px}
.res-fed{margin-bottom:20px}
.res-fed h3{font-size:14px;color:var(--muted);margin:0 0 8px}
.rank-match{display:inline-block;background:rgba(0,221,180,.15);color:var(--accent);border:1px solid rgba(0,221,180,.4);padding:4px 12px;border-radius:20px;font-weight:700;font-size:14px;margin:2px}
.rank-miss{display:inline-block;background:var(--panel);color:var(--muted);border:1px solid var(--line);padding:4px 12px;border-radius:20px;font-size:13px;margin:2px}
</style>
</head>
<body>
${header()}
<div class="wrap">
<nav class="crumbs">
  <a href="../">Главная</a> /
  <a href="./">Все нормативы</a> /
  Какой разряд — ${discRu} (${sexRu})
</nav>
<h1>Какой разряд в ${discRu}? <small style="font-size:14px;color:var(--muted)">(${sexRu})</small></h1>
<p class="lead">Введите ваш результат в ${discRu}, чтобы узнать, какому спортивному разряду он соответствует по нормативам всех федераций и весовых категорий.</p>

<div class="rev-form">
  <input type="number" id="kg-input" placeholder="Результат, кг" min="0" max="1500" step="0.5">
  <button onclick="calcRank()">Определить разряд</button>
</div>
<div id="result-block"></div>

${cta()}

<h2>Как пользоваться</h2>
<div class="faq-item">
  <div class="faq-q">Введите результат в кг и нажмите «Определить разряд»</div>
  <div class="faq-a">Инструмент покажет, к каким разрядам относится ваш результат в разных весовых категориях и федерациях. Если результат превышает норматив — разряд выполнен.</div>
</div>
<div class="faq-item">
  <div class="faq-q">Почему разные весовые категории?</div>
  <div class="faq-a">Нормативы зависят от вашей собственной весовой категории. Найдите свою весовую категорию в результатах — именно там ваш разряд.</div>
</div>

<h2>Полные таблицы нормативов</h2>
<div class="links">
${fedDataList.map(([fed,data])=>{
  return data.rows.map(r=>`<a href="${slug(disc,fed,sex,r.w)}">${FED_SHORT[fed]} · ${r.w} кг</a>`).join('\n');
}).join('\n')}
</div>

</div>
${footer()}
<script>
const DATA=${jsData};
function calcRank(){
  const kg=parseFloat(document.getElementById('kg-input').value);
  if(!kg||kg<=0){alert('Введите корректный результат в кг');return;}
  let html='';
  for(const fed of DATA){
    let fedHtml='<div class="res-fed"><h3>'+fed.fed+'</h3>';
    for(const row of fed.rows){
      fedHtml+='<div style="margin-bottom:6px"><span style="font-size:12px;color:var(--muted)">'+row.w+' кг:</span> ';
      let matched=false;
      for(let i=0;i<fed.ranks.length;i++){
        const v=row.v[i];
        if(v===null) continue;
        if(kg>=v){
          fedHtml+='<span class="rank-match">'+fed.ranks[i]+' ✓ ('+v+' кг)</span>';
          matched=true;
          break;
        }
      }
      if(!matched){
        const minV=row.v.filter(x=>x!==null);
        const lowest=minV[minV.length-1];
        fedHtml+='<span class="rank-miss">нет разряда (мин: '+lowest+' кг)</span>';
      }
      fedHtml+='</div>';
    }
    fedHtml+='</div>';
    html+=fedHtml;
  }
  document.getElementById('result-block').innerHTML='<h2>Результат: '+kg+' кг</h2>'+html;
}
document.getElementById('kg-input').addEventListener('keydown',function(e){if(e.key==='Enter')calcRank();});
</script>
</body>
</html>`;
      writeFile(fname, html);
      count++;
    }
  }
  console.log(`Тип 3 (обратный поиск): ${count} страниц`);
  return count;
}

// ─── ТИП 4: Полные таблицы по дисциплине+пол (обзорные хабы) ─────────────
// Формат: zhim-muzhchiny-vse-federacii.html
function genDiscSexHubPages(){
  let count = 0;
  for(const disc of Object.keys(D)){
    for(const sex of ['m','f']){
      const feds = D[disc][sex];
      if(!feds) continue;
      const fedDataList = Object.entries(feds).filter(([,d])=>!d.nodata);
      if(!fedDataList.length) continue;

      const discRu = DISC_RU[disc];
      const sexRu = SEX_RU[sex];
      const discSlug = DISC_SLUG[disc];
      const sexSlug = SEX_SLUG[sex];
      const fname = `${discSlug}-${sexSlug}-vse-federacii.html`;
      const canonUrl = `${BASE_URL}/normativy/${fname}`;

      const title = `Нормативы ${discRu} — ${sexRu}, все федерации 2025–2026 | таблица`;
      const desc = `Полные таблицы нормативов разрядов по ${discRu} для ${sexRu} по всем федерациям: ФПР, WRPF, НАП, СПР. МСМК, МС, КМС, I, II, III разряды.`;

      const fedLinks = fedDataList.map(([fed,data])=>{
        const rows = data.rows.map(r=>`<a href="${slug(disc,fed,sex,r.w)}">${r.w} кг</a>`).join('\n');
        return `<h3 style="font-size:15px;margin:20px 0 8px;color:#cfeee8">${FED_SHORT[fed]}</h3>
<p style="font-size:13px;color:var(--muted);margin:0 0 8px">${data.note}</p>
<div class="links">${rows}</div>`;
      }).join('\n');

      const faqItems = [
        {q:`Какие нормативы в ${discRu} для ${sexRu} по ФПР (IPF)?`,
         a:`Нормативы ФПР (IPF) в ${discRu} для ${sexRu} зависят от весовой категории. Выберите свою весовую категорию в таблице ФПР на этой странице.`},
        {q:`Чем отличаются нормативы WRPF и ФПР в ${discRu}?`,
         a:`WRPF и ФПР используют разные весовые категории и критерии присвоения разрядов. WRPF, как правило, имеет более широкий диапазон весовых категорий.`},
        {q:`Актуальны ли нормативы ${discRu} для ${sexRu} в 2026 году?`,
         a:`Да, данные соответствуют ЕВСК 2022–2026 для ФПР и актуальным положениям WRPF, НАП, СПР на 2025–2026 год.`},
      ];
      const faqLd = JSON.stringify({
        "@context":"https://schema.org","@type":"FAQPage",
        "mainEntity": faqItems.map(f=>({
          "@type":"Question","name":f.q,
          "acceptedAnswer":{"@type":"Answer","text":f.a}
        }))
      });
      const breadLd = JSON.stringify({
        "@context":"https://schema.org","@type":"BreadcrumbList",
        "itemListElement":[
          {"@type":"ListItem","position":1,"name":"Главная","item":`${BASE_URL}/`},
          {"@type":"ListItem","position":2,"name":"Все нормативы","item":`${BASE_URL}/normativy/`},
          {"@type":"ListItem","position":3,"name":`${discRu} (${sexRu})`}
        ]
      });

      const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonUrl}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonUrl}">
<link rel="icon" type="image/png" href="../favicon.png">
<script type="application/ld+json">${faqLd}</script>
<script type="application/ld+json">${breadLd}</script>
${css()}
</head>
<body>
${header()}
<div class="wrap">
<nav class="crumbs">
  <a href="../">Главная</a> /
  <a href="./">Все нормативы</a> /
  ${discRu} · ${sexRu}
</nav>
<h1>Нормативы ${discRu} — ${sexRu} <small style="font-size:14px;color:var(--muted)">все федерации</small></h1>
<p class="lead">Таблицы разрядных нормативов по <strong>${discRu}</strong> для <strong>${sexRu}</strong> по всем федерациям пауэрлифтинга. Выберите федерацию и весовую категорию.</p>

${fedLinks}

${cta()}

<h2>Часто задаваемые вопросы</h2>
${faqItems.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('\n')}

<h2>Определить разряд по результату</h2>
<div class="links">
<a href="kakoj-razryad-${discSlug}-${sexSlug}.html">🔍 Какой разряд у моего результата в ${discRu} (${sexRu})?</a>
</div>
</div>
${footer()}
</body>
</html>`;
      writeFile(fname, html);
      count++;
    }
  }
  console.log(`Тип 4 (хаб дисциплина+пол): ${count} страниц`);
  return count;
}

// ─── ТИП 5: Страницы для конкретного разряда по всем весам и федерациям ──
// Формат: kms-zhim-muzhchiny.html — "Норматив КМС жим лёжа мужчины — все веса"
function genRankDiscPages(){
  let count = 0;
  for(const disc of Object.keys(D)){
    for(const sex of ['m','f']){
      const feds = D[disc][sex];
      if(!feds) continue;
      const fedDataList = Object.entries(feds).filter(([,d])=>!d.nodata);
      if(!fedDataList.length) continue;

      // Собираем все уникальные разряды
      const rankSet = new Set();
      for(const [,data] of fedDataList) data.ranks.forEach(r=>rankSet.add(r));

      for(const rank of rankSet){
        const discRu = DISC_RU[disc];
        const sexRu = SEX_RU[sex];
        const discSlug = DISC_SLUG[disc];
        const sexSlug = SEX_SLUG[sex];
        const rSlug = rankSlug(rank);
        const fname = `${rSlug}-${discSlug}-${sexSlug}.html`;
        const canonUrl = `${BASE_URL}/normativy/${fname}`;

        // Для каждой федерации — таблица по весовым категориям для этого разряда
        let tablesHtml = '';
        const faqItems = [];

        for(const [fed,data] of fedDataList){
          const ri = data.ranks.indexOf(rank);
          if(ri === -1) continue;
          const fedShort = FED_SHORT[fed];
          const rows = data.rows.map(r=>{
            const val = r.v[ri];
            if(val===null) return `<tr><td>${r.w} кг</td><td class="val" style="color:var(--muted)">—</td></tr>`;
            return `<tr><td>${r.w} кг</td><td class="val">${val} кг</td></tr>`;
          }).join('');
          tablesHtml += `<h3 style="font-size:15px;margin:20px 0 6px;color:#cfeee8">${fedShort}</h3>
<table><thead><tr><th>Весовая категория</th><th style="text-align:right">Норматив</th></tr></thead>
<tbody>${rows}</tbody></table>\n`;

          // FAQ
          const validRows = data.rows.filter(r=>{const v=r.v[ri]; return v!==null;});
          if(validRows.length > 0){
            const minRow = validRows[validRows.length-1];
            const maxRow = validRows[0];
            faqItems.push({
              q:`Норматив ${rank} в ${discRu} для ${sexRu} (${fedShort}) — минимальный?`,
              a:`Минимальный норматив ${rank} в ${discRu} у ${sexRu} (${fedShort}) — в весовой категории ${minRow.w} кг: ${minRow.v[ri]} кг. Максимальный — ${maxRow.w} кг: ${maxRow.v[ri]} кг.`
            });
          }
        }

        const title = `Норматив ${rank} в ${discRu} — ${sexRu}, все весовые категории`;
        const desc = `Нормативы разряда ${rank} по ${discRu} для ${sexRu} во всех весовых категориях и федерациях: ФПР, WRPF, НАП, СПР. Таблица 2025–2026.`;

        const faqLd = JSON.stringify({
          "@context":"https://schema.org","@type":"FAQPage",
          "mainEntity": faqItems.slice(0,4).map(f=>({
            "@type":"Question","name":f.q,
            "acceptedAnswer":{"@type":"Answer","text":f.a}
          }))
        });
        const breadLd = JSON.stringify({
          "@context":"https://schema.org","@type":"BreadcrumbList",
          "itemListElement":[
            {"@type":"ListItem","position":1,"name":"Главная","item":`${BASE_URL}/`},
            {"@type":"ListItem","position":2,"name":"Все нормативы","item":`${BASE_URL}/normativy/`},
            {"@type":"ListItem","position":3,"name":`${discRu} (${sexRu})`,"item":`${BASE_URL}/normativy/${discSlug}-${sexSlug}-vse-federacii.html`},
            {"@type":"ListItem","position":4,"name":`Разряд ${rank}`}
          ]
        });

        // Ссылки на конкретные страницы разряд+вес
        const weightLinks = fedDataList.map(([fed,data])=>{
          const ri = data.ranks.indexOf(rank);
          if(ri===-1) return '';
          return data.rows.map(r=>{
            const val = r.v[ri];
            if(val===null) return '';
            const href = `${discSlug}-${FED_SLUG[fed]}-${sexSlug}-${wSlug(r.w)}-kg-${rSlug}.html`;
            return `<a href="${href}">${FED_SHORT[fed]} · ${r.w} кг</a>`;
          }).filter(Boolean).join('\n');
        }).filter(Boolean).join('\n');

        const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonUrl}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="article">
<meta property="og:url" content="${canonUrl}">
<link rel="icon" type="image/png" href="../favicon.png">
<script type="application/ld+json">${faqLd}</script>
<script type="application/ld+json">${breadLd}</script>
${css()}
</head>
<body>
${header()}
<div class="wrap">
<nav class="crumbs">
  <a href="../">Главная</a> /
  <a href="./">Все нормативы</a> /
  <a href="${discSlug}-${sexSlug}-vse-federacii.html">${discRu} · ${sexRu}</a> /
  Разряд ${rank}
</nav>
<h1>Норматив <strong>${rank}</strong> по ${discRu} — ${sexRu} <small style="font-size:14px;color:var(--muted)">все весовые категории</small></h1>
<p class="lead">Нормативы разряда <strong>${rank}</strong> в <strong>${discRu}</strong> для <strong>${sexRu}</strong> во всех весовых категориях и федерациях пауэрлифтинга.</p>

${tablesHtml}

${cta()}

${faqItems.length > 0 ? `<h2>Часто задаваемые вопросы</h2>
${faqItems.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><div class="faq-a">${f.a}</div></div>`).join('\n')}` : ''}

<h2>Детальные страницы по весовым категориям</h2>
<div class="links">
${weightLinks}
</div>
</div>
${footer()}
</body>
</html>`;
        writeFile(fname, html);
        count++;
      }
    }
  }
  console.log(`Тип 5 (разряд по всем весам): ${count} страниц`);
  return count;
}

// ─── ОБНОВИТЬ index.html нормативов ──────────────────────────────────────
function updateNormativyIndex(existingUrls){
  // Просто дополняем существующий index.html ссылками на новые разделы
  const indexPath = path.join(OUT_DIR, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  
  const newSections = `
<!-- Новые разделы SEO v2 -->
<h2 id="reverse">Определить разряд по результату</h2>
<div class="links">
${Object.keys(D).map(disc=>{
  return ['m','f'].map(sex=>{
    const feds = D[disc][sex];
    if(!feds) return '';
    const fedDataList = Object.entries(feds).filter(([,d])=>!d.nodata);
    if(!fedDataList.length) return '';
    return `<a href="kakoj-razryad-${DISC_SLUG[disc]}-${SEX_SLUG[sex]}.html">Какой разряд — ${DISC_RU[disc]} (${SEX_RU[sex]})</a>`;
  }).filter(Boolean).join('\n');
}).filter(Boolean).join('\n')}
</div>

<h2 id="hubs">Все нормативы по дисциплине</h2>
<div class="links">
${Object.keys(D).map(disc=>{
  return ['m','f'].map(sex=>{
    const feds = D[disc][sex];
    if(!feds) return '';
    const fedDataList = Object.entries(feds).filter(([,d])=>!d.nodata);
    if(!fedDataList.length) return '';
    return `<a href="${DISC_SLUG[disc]}-${SEX_SLUG[sex]}-vse-federacii.html">${DISC_RU[disc]} — ${SEX_RU[sex]}</a>`;
  }).filter(Boolean).join('\n');
}).filter(Boolean).join('\n')}
</div>
`;

  // Вставляем перед закрывающим </div> финального блока
  if(!html.includes('Новые разделы SEO v2')){
    html = html.replace('<footer>', newSections + '<footer>');
    fs.writeFileSync(indexPath, html, 'utf8');
  }
}

// ─── СИТEMAP ──────────────────────────────────────────────────────────────
function genSitemap(allUrls){
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u=>`  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');  console.log(`Sitemap: ${allUrls.length} URL`);
}

// ─── MAIN ────────────────────────────────────────────────────────────────
console.log('Генерация SEO-страниц...\n');

// Добавляем существующие 279 URL в sitemap
const existingFiles = fs.readdirSync(OUT_DIR).filter(f=>f.endsWith('.html') && f!=='index.html');
for(const f of existingFiles){
  allUrls.push(`${BASE_URL}/normativy/${f}`);
}
allUrls.push(`${BASE_URL}/normativy/`);
allUrls.push(`${BASE_URL}/`);

const t1 = genRankWeightPages();
const t2 = genComparisonPages();
const t3 = genReversePages();
const t4 = genDiscSexHubPages();
const t5 = genRankDiscPages();

updateNormativyIndex(allUrls);
genSitemap(allUrls);

console.log(`\n✅ Итого новых страниц: ${t1+t2+t3+t4+t5}`);
console.log(`Всего URL в sitemap: ${allUrls.length}`);

// ─── INDEXNOW SUBMIT ────────────────────────────────────────────────────────
// Шаг 1: придумай ключ (32+ символа, только буквы и цифры)
// Шаг 2: создай файл <ключ>.txt в корне репо, содержимое = сам ключ
// Шаг 3: вставь ключ в строку ниже
const INDEXNOW_KEY = 'a7f3k9d2m1p8q4r6s5twiofgalfhgzdr';

if(process.argv.includes('--submit')){
  if(INDEXNOW_KEY === 'ВСТАВЬ_СВОЙ_КЛЮЧ_СЮДА'){
    console.log('\n⚠️  Сначала вставь свой ключ в переменную INDEXNOW_KEY в generate.js');
    process.exit(1);
  }
  const https = require('https');
  const body = JSON.stringify({
    host: 'nikitatopro36-dot.github.io',
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: allUrls
  });
  console.log(`\nОтправляю ${allUrls.length} URL в Яндекс IndexNow...`);
  const req = https.request({
    hostname: 'yandex.com',
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body)
    }
  }, res => {
    console.log(`IndexNow → Яндекс: HTTP ${res.statusCode}`);
    if(res.statusCode === 200) console.log('✅ Яндекс принял URL на индексацию');
    else if(res.statusCode === 202) console.log('✅ Принято (202) — URL в очереди');
    else console.log('⚠️  Проверь: файл-ключ залит на GitHub? Ключ совпадает с именем файла?');
  });
  req.on('error', e => console.error('Ошибка запроса:', e.message));
  req.write(body);
  req.end();
}
