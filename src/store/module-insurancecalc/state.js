export default function () {
  return {
    listTextBlocks: {
      common: `Для подготовки договора мне понадобятся следующие документы и данные:
      - паспорт заемщика (первая страница-разворот и страница с пропиской)
      - - телефон клиента
      - почта клиента
      - сумма ипотеки
      - - дата сделки
      - номер кредитного договора
      - - что нужно страховать (жизнь, имущество, титул)
      - - место работы
      - должность`,
      life: `- - рост/вес`,
      estate: `- выписка из ЕГРН.`,
      title: `Если требуется страхование Титула, то дополнительно потребуются следующие документы:
      - отчет об оценке
      - - выписка из ЕГРН (не старше одного месяца)
      - форма 7, форма 9 (не старше одного месяца)
      - - паспорта предыдущих собственников (все страницы)
      - ДКП покупателя
      - - документ, по которому квартира перешла в собственность продавца (ДДУ/ДКП)
      - если квартира приобреталась в браке, то согласие супруги/супруга на продажу
      - - если есть несовершеннолетние собственники, то справка из органов опеки
      - если собственнику квартиры больше 60 лет, то справки ПНД и НД или водительское удостоверение
      - фио, почта, телефон кредитного менеджера банка`,
      long: `- дата окончания кредитного договора
      - сумма остатка задолженности
      - сроки действия предыдущего полиса страхования
      - процентная ставка
      - аннуитетный платеж`
    },
    banks: [
    {value: 19, label: `Сбербанк`, comission: 0.45},
    {value: 0, label: `АКБарс`, comission: 0.15},
    // {value: 1, label: `Бинбанк`, comission: 0},
    // {value: 2, label: `Возрождени`, comission: 0.15},
    {value: 3, label: `ВТБ`, comission: 0.15},
    {value: 4, label: `Газпром банк`, comission: 0.2},
    {value: 5, label: `Глобэксбанк`, comission: 0.2},
    // {value: 6, label: `Дальневосточный банк`, comission: 0.15},
    {value: 7, label: `ДОМ.РФ`, comission: 0.05},
    {value: 8, label: `Зенит`, comission: 0.15},
    // {value: 9, label: `Интеза`, comission: 0.1},
    // {value: 10, label: `КредитЕвропаБанк`, comission: 0.15},
    // {value: 11, label: `Металлинвестбанк`, comission: 0.15},
    // {value: 12, label: `Московский Индустриальный Банк (Минбанк)`, comission: 0.15},
    // {value: 13, label: `Открытие`, comission: 0},
    {value: 14, label: `ПромСвязьБанк`, comission: 0.15},
    {value: 15, label: `Райффайзен`, comission: 0.15},
    // {value: 16, label: `Росбанк (Дельта Кредит)`, comission: 0.15},
    // {value: 17, label: `РостФинанс`, comission: 0},
    {value: 18, label: `РСХБ`, comission: 0.15},
    {value: 20, label: `Связь банк`, comission: 0.2},
    {value: 21, label: `Северный Морской Путь (СМП)`, comission: 0.2},
    // {value: 22, label: `Союз`, comission: 0},
    // {value: 23, label: `ТрансКапиталБанк`, comission: 0.15},
    {value: 24, label: `Уралсиб`, comission: 0.15},
    // {value: 25, label: `Уральский Банк реконструкции и развития (УБРиР)`, comission: 0.15},
    {value: 26, label: `Юникредит`, comission: 0.15},
    ],
    insCompanies: [
      {
        id: 1,
        name: 'ingos',
        label: 'Ингосстрах',
        banks: {
          19: {
            life: 'ingossber',
            estate: 0.0015,
            title: 0.0018
          },
          0: {
            life: 'ingosstandart',
            estate: 0.0012,
            title: 0.0018
          },
          3: {
            life: 'ingosstandart',
            estate: 0.0012,
            title: 0.0018
          },
          4: {
            life: 'ingosstandart',
            estate: 0.0012,
            title: 0.0018
          },
          5: {
            life: 'ingosdomrf',
            estate: 0.0014,
            title: 0.002
          },
          7: {
            life: 'ingosdomrf',
            estate: 0.0015,
            title: 0.002
          },
          8: {
            life: 'ingosstandart',
            estate: 0.0013,
            title: 0.0018
          },
          14: {
            life: 'ingosstandart',
            estate: 0.0012,
            title: 0.0018
          },
          15: {
            life: 'ingosstandart',
            estate: 0.0012,
            title: 0.0018
          },
          18: {
            life: 'ingosrshb',
            estate: 0.0017,
            title: 0.002
          },
          20: {
            life: 'ingosdomrf',
            estate: 0.0014,
            title: 0.002
          },
          21: {
            life: 'ingosstandart',
            estate: 0.0012,
            title: 0.0018
          },
          24: {
            life: 'ingosstandart',
            estate: 0.0014,
            title: 0.002
          },
          26: {
            life: 'ingosstandart',
            estate: 0.0012,
            title: 0.0018
          },
        }
      },

    ],
    rates: {
      ingossber: {
        20: {male: 0.0015, female: 0.0011}, 21: {male: 0.0015, female: 0.0011}, 22: {male: 0.0015, female: 0.0011}, 23: {male: 0.0015, female: 0.0011}, 24: {male: 0.0015, female: 0.0011}, 25: {male: 0.0016, female: 0.0011}, 26: {male: 0.0017, female: 0.0011}, 27: {male: 0.0018, female: 0.0011}, 28: {male: 0.0019, female: 0.0011}, 29: {male: 0.0020, female: 0.0011}, 30: {male: 0.0021, female: 0.0012}, 31: {male: 0.0022, female: 0.0013}, 32: {male: 0.0023, female: 0.0014}, 33: {male: 0.0024, female: 0.0015}, 34: {male: 0.0025, female: 0.0016}, 35: {male: 0.0026, female: 0.0017}, 36: {male: 0.0027, female: 0.0018}, 37: {male: 0.0028, female: 0.0019}, 38: {male: 0.0028, female: 0.0020}, 39: {male: 0.0028, female: 0.0021}, 40: {male: 0.0033, female: 0.0022}, 41: {male: 0.0035, female: 0.0023}, 42: {male: 0.0037, female: 0.0025}, 43: {male: 0.0040, female: 0.0026}, 44: {male: 0.0043, female: 0.0028}, 45: {male: 0.0045, female: 0.0031}, 46: {male: 0.0050, female: 0.0035}, 47: {male: 0.0055, female: 0.0037}, 48: {male: 0.0055, female: 0.0040}, 49: {male: 0.0055, female: 0.0045}, 50: {male: 0.0075, female: 0.0050}, 51: {male: 0.0085, female: 0.0060}, 52: {male: 0.0095, female: 0.0065}, 53: {male: 0.0100, female: 0.0070}, 54: {male: 0.0100, female: 0.0070}, 55: {male: 0.0130, female: 0.0080}, 56: {male: 0.0140, female: 0.0085}, 57: {male: 0.0150, female: 0.0090}, 58: {male: 0.0160, female: 0.0100}, 59: {male: 0.0160, female: 0.0120}, 60: {male: 0.0180, female: 0.0125}, 61: {male: 0.0190, female: 0.0130}, 62: {male: 0.0200, female: 0.0140}, 63: {male: 0.0210, female: 0.0150}, 64: {male: 0.0220, female: 0.0160}, 65: {male: 0.0220, female: 0.0180}, 66: {male: 0.0220, female: 0.0190}, 67: {male: 0.0220, female: 0.0200}, 68: {male: 0.0220, female: 0.0210}, 69: {male: 0.0220, female: 0.0220}, 70: {male: 0.0220, female: 0.0220}, 71: {male: 0.0220, female: 0.0220}, 72: {male: 0.0220, female: 0.0220}, 73: {male: 0.0220, female: 0.0220}, 74: {male: 0.0220, female: 0.0220}, 75: {male: 0.0220, female: 0.0220},
      },
      ingosstandart: {
        20: {male: 0.0015, female: 0.0011}, 21: {male: 0.0015, female: 0.0011}, 22: {male: 0.0015, female: 0.0011}, 23: {male: 0.0015, female: 0.0011}, 24: {male: 0.0015, female: 0.0011}, 25: {male: 0.0016, female: 0.0011}, 26: {male: 0.0017, female: 0.0011}, 27: {male: 0.0018, female: 0.0011}, 28: {male: 0.0019, female: 0.0011}, 29: {male: 0.0020, female: 0.0011}, 30: {male: 0.0021, female: 0.0012}, 31: {male: 0.0022, female: 0.0013}, 32: {male: 0.0023, female: 0.0014}, 33: {male: 0.0024, female: 0.0015}, 34: {male: 0.0025, female: 0.0016}, 35: {male: 0.0026, female: 0.0017}, 36: {male: 0.0027, female: 0.0018}, 37: {male: 0.0028, female: 0.0019}, 38: {male: 0.0028, female: 0.0020}, 39: {male: 0.0028, female: 0.0021}, 40: {male: 0.0033, female: 0.0022}, 41: {male: 0.0035, female: 0.0023}, 42: {male: 0.0037, female: 0.0025}, 43: {male: 0.0040, female: 0.0026}, 44: {male: 0.0043, female: 0.0028}, 45: {male: 0.0045, female: 0.0031}, 46: {male: 0.0050, female: 0.0035}, 47: {male: 0.0055, female: 0.0037}, 48: {male: 0.0055, female: 0.0040}, 49: {male: 0.0055, female: 0.0045}, 50: {male: 0.0075, female: 0.0050}, 51: {male: 0.0085, female: 0.0060}, 52: {male: 0.0095, female: 0.0065}, 53: {male: 0.0100, female: 0.0070}, 54: {male: 0.0100, female: 0.0070}, 55: {male: 0.0130, female: 0.0080}
      },
      ingosotkr: {
        18: {male: 0.0040, female: 0.0032}, 19: {male: 0.0040, female: 0.0032}, 20: {male: 0.0040, female: 0.0032}, 21: {male: 0.0040, female: 0.0032}, 22: {male: 0.0041, female: 0.0032}, 23: {male: 0.0041, female: 0.0032}, 24: {male: 0.0041, female: 0.0034}, 25: {male: 0.0041, female: 0.0034}, 26: {male: 0.0041, female: 0.0034}, 27: {male: 0.0041, female: 0.0034}, 28: {male: 0.0041, female: 0.0034}, 29: {male: 0.0042, female: 0.0034}, 30: {male: 0.0044, female: 0.0038}, 31: {male: 0.0044, female: 0.0038}, 32: {male: 0.0044, female: 0.0038}, 33: {male: 0.0044, female: 0.0038}, 34: {male: 0.0045, female: 0.0040}, 35: {male: 0.0048, female: 0.0043}, 36: {male: 0.0051, female: 0.0046}, 37: {male: 0.0054, female: 0.0047}, 38: {male: 0.0057, female: 0.0047}, 39: {male: 0.0056, female: 0.0047}, 40: {male: 0.0060, female: 0.0051}, 41: {male: 0.0063, female: 0.0051}, 42: {male: 0.0066, female: 0.0051}, 43: {male: 0.0070, female: 0.0058}, 44: {male: 0.0075, female: 0.0061}, 45: {male: 0.0081, female: 0.0066}, 46: {male: 0.0087, female: 0.0069}, 47: {male: 0.0095, female: 0.0075}, 48: {male: 0.0102, female: 0.0084}, 49: {male: 0.0109, female: 0.0090}, 50: {male: 0.0119, female: 0.0100}, 51: {male: 0.0129, female: 0.0106}, 52: {male: 0.0137, female: 0.0119}, 53: {male: 0.0145, female: 0.0133}, 54: {male: 0.0153, female: 0.0146}, 55: {male: 0.0183, female: 0.0162}
      },
      ingosrshb: {
        20: {male: 0.0022, female: 0.0017}, 21: {male: 0.0023, female: 0.0017}, 22: {male: 0.0024, female: 0.0018}, 23: {male: 0.0024, female: 0.0018}, 24: {male: 0.0025, female: 0.0019}, 25: {male: 0.0026, female: 0.0020}, 26: {male: 0.0026, female: 0.0018}, 27: {male: 0.0027, female: 0.0019}, 28: {male: 0.0028, female: 0.0020}, 29: {male: 0.0029, female: 0.0021}, 30: {male: 0.0030, female: 0.0022}, 31: {male: 0.0034, female: 0.0020}, 32: {male: 0.0035, female: 0.0021}, 33: {male: 0.0036, female: 0.0022}, 34: {male: 0.0037, female: 0.0022}, 35: {male: 0.0038, female: 0.0024}, 36: {male: 0.0039, female: 0.0028}, 37: {male: 0.0040, female: 0.0029}, 38: {male: 0.0041, female: 0.0030}, 39: {male: 0.0043, female: 0.0031}, 40: {male: 0.0044, female: 0.0032}, 41: {male: 0.0051, female: 0.0033}, 42: {male: 0.0054, female: 0.0036}, 43: {male: 0.0058, female: 0.0039}, 44: {male: 0.0062, female: 0.0040}, 45: {male: 0.0066, female: 0.0043}, 46: {male: 0.0071, female: 0.0050}, 47: {male: 0.0076, female: 0.0053}, 48: {male: 0.0081, female: 0.0056}, 49: {male: 0.0087, female: 0.0061}, 50: {male: 0.0093, female: 0.0065}, 51: {male: 0.0201, female: 0.0112}, 52: {male: 0.0202, female: 0.0115}, 53: {male: 0.0214, female: 0.0121}, 54: {male: 0.0238, female: 0.0133}, 55: {male: 0.0249, female: 0.0150}, 56: {male: 0.0263, female: 0.0175}, 57: {male: 0.0290, female: 0.0189}, 58: {male: 0.0299, female: 0.0202}, 59: {male: 0.0357, female: 0.0215}, 60: {male: 0.0357, female: 0.0226}, 61: {male: 0.0379, female: 0.0247}, 62: {male: 0.0387, female: 0.0251}, 63: {male: 0.0428, female: 0.0273}, 64: {male: 0.0470, female: 0.0308}, 65: {male: 0.0494, female: 0.0318}
      },
      ingosdomrf: {
        21: {male: 0.0026, female: 0.0020}, 22: {male: 0.0027, female: 0.0020}, 23: {male: 0.0027, female: 0.0020}, 24: {male: 0.0030, female: 0.0021}, 25: {male: 0.0030, female: 0.0021}, 26: {male: 0.0030, female: 0.0021}, 27: {male: 0.0031, female: 0.0023}, 28: {male: 0.0031, female: 0.0024}, 29: {male: 0.0032, female: 0.0024}, 30: {male: 0.0035, female: 0.0024}, 31: {male: 0.0037, female: 0.0025}, 32: {male: 0.0038, female: 0.0026}, 33: {male: 0.0039, female: 0.0027}, 34: {male: 0.0043, female: 0.0027}, 35: {male: 0.0044, female: 0.0030}, 36: {male: 0.0048, female: 0.0032}, 37: {male: 0.0051, female: 0.0035}, 38: {male: 0.0054, female: 0.0036}, 39: {male: 0.0057, female: 0.0038}, 40: {male: 0.0059, female: 0.0039}, 41: {male: 0.0063, female: 0.0042}, 42: {male: 0.0066, female: 0.0044}, 43: {male: 0.0070, female: 0.0047}, 44: {male: 0.0074, female: 0.0050}, 45: {male: 0.0077, female: 0.0053}, 46: {male: 0.0086, female: 0.0056}, 47: {male: 0.0092, female: 0.0060}, 48: {male: 0.0101, female: 0.0065}, 49: {male: 0.0109, female: 0.0069}, 50: {male: 0.0120, female: 0.0074}, 51: {male: 0.0131, female: 0.0080}, 52: {male: 0.0142, female: 0.0086}, 53: {male: 0.0154, female: 0.0092}, 54: {male: 0.0169, female: 0.0100}, 55: {male: 0.0183, female: 0.0108}
      }
    }    
  }  
}
