(function () {
  const APP_TITLE = "WzZzZ";
  const DOCTOR_NAME = {
    ar: "د. نوار",
    en: "Dr. Nawar",
  };
  const VISIT_OPTIONS = [
    "كشف",
    "تنظيف وتلميع الأسنان",
    "حشوة تجميلية",
    "تقويم ومراجعة",
    "خلع جراحي",
    "علاج عصب",
    "استشارة عامة",
    "غير ذلك",
  ];
  const ACTIONS = [
    { id: "exam", name: "فحص", fill: "#e8f1fb", stroke: "#2563a8", root: "#b7d6f7", text: "#15457a" },
    { id: "cleaning", name: "تنظيف", fill: "#e0f5f0", stroke: "#0f7d6b", root: "#9fded0", text: "#0b5c4f" },
    { id: "filling", name: "حشوة", fill: "#f0ebff", stroke: "#5a3fa0", root: "#d5c6ff", text: "#462d83" },
    { id: "rct", name: "عصب", fill: "#fff3e0", stroke: "#b86a00", root: "#ffd08b", text: "#875000" },
    { id: "crown", name: "تاج", fill: "#fde8cf", stroke: "#bf7a1b", root: "#f3c27d", text: "#7a4909" },
    { id: "missing", name: "مفقود", fill: "#fdf0ef", stroke: "#df5c57", root: "#f8cac7", text: "#a1312d" },
    { id: "fracture", name: "مكسور", fill: "#fdecea", stroke: "#c0392b", root: "#f2b8b0", text: "#8b241d" },
    { id: "sensitive", name: "حساس", fill: "#e9fbff", stroke: "#0d87a5", root: "#bfeaf3", text: "#0c5f74" },
    { id: "watch", name: "متابعة", fill: "#f3f5f9", stroke: "#64748b", root: "#d8dee8", text: "#475569" },
  ];
  const CUSTOM_ACTION = { id: "custom", name: "غير ذلك", fill: "#eef2ff", stroke: "#5b6b96", root: "#dbe3f7", text: "#405173" };
  const ACTION_MAP = Object.fromEntries(ACTIONS.concat(CUSTOM_ACTION).map((action) => [action.id, action]));
  const TOOTH_TYPES = { I: "قاطع", C: "ناب", P: "ضاحك", M: "ضرس", W: "عقل" };
  const TOOTH_SIDES = { UR: "يمين علوي", UL: "يسار علوي", LR: "يمين سفلي", LL: "يسار سفلي" };
  const TIMES = ["08:00", "09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00"];
  const TIME_PICKER_HOURS = Array.from({ length: 12 }, function (_, index) {
    return { value: String(index + 1).padStart(2, "0"), label: String(index + 1) };
  });
  const TIME_PICKER_MINUTES = Array.from({ length: 12 }, function (_, index) {
    const minute = index * 5;
    return { value: String(minute).padStart(2, "0"), label: String(minute).padStart(2, "0") };
  });
  const TIME_PICKER_PERIODS = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];
  const PATIENT_PALETTE = [
    { color: "#2563a8", bg: "#e8f1fb" },
    { color: "#5a3fa0", bg: "#f0ebff" },
    { color: "#0f7d6b", bg: "#e0f5f0" },
    { color: "#b86a00", bg: "#fff3e0" },
    { color: "#c0392b", bg: "#fdecea" },
  ];
  const TD = {
    W: { cw: 16, ch: 20, rh: 11 },
    M: { cw: 19, ch: 24, rh: 12 },
    P: { cw: 13, ch: 21, rh: 11 },
    C: { cw: 11, ch: 22, rh: 14 },
    I: { cw: 12, ch: 19, rh: 13 },
  };
  const STORAGE_KEYS = {
    patients: "nawara_patients_v3",
    appointments: "nawara_appointments_v3",
    language: "nawara_language_v1",
  };
  const LEGACY_STORAGE_KEYS = {
    patients: [STORAGE_KEYS.patients, "nawara_patients_v2"],
    appointments: [STORAGE_KEYS.appointments, "nawara_appointments_v2"],
    language: [STORAGE_KEYS.language],
  };
  const SQLITE_CONFIG = {
    database: "nawara_mobile",
    table: "app_storage",
    version: 1,
  };
  const LANGUAGE_OPTIONS = ["ar", "en"];
  const TEXT = {
    ar: {
      home: "الرئيسية",
      appointments: "المواعيد",
      patients: "المرضى",
      nextAppointment: "الموعد القادم",
      noUpcoming: "لا يوجد موعد قريب",
      calmSchedule: "الجدول هادئ حالياً",
      appointmentsToday: "مواعيد اليوم",
      totalPatients: "إجمالي المرضى",
      todayAgenda: "جدول اليوم",
      noAppointmentsToday: "لا توجد مواعيد لليوم.",
      patientsTitle: "المرضى",
      patientsShown: "مريض ظاهر",
      searchName: "الاسم",
      searchPhone: "رقم الهاتف",
      searchFileNumber: "رقم الملف",
      noSearchResults: "لا توجد نتائج مطابقة لحقول البحث الحالية.",
      scheduleList: "قائمة اليوم",
      noAppointmentsDate: "لا يوجد مواعيد لهذا التاريخ.",
      back: "رجوع",
      latestVisit: "آخر زيارة",
      visits: "الزيارات",
      visitUnit: "زيارة",
      infoTab: "المعلومات",
      chartTab: "رسم الأسنان",
      historyTab: "سجل العلاج",
      photosTab: "الصور",
      contactInfo: "معلومات الاتصال",
      phoneLabel: "رقم الهاتف",
      joinDateLabel: "تاريخ التسجيل",
      phonePlaceholder: "يمكن إضافته لاحقًا",
      saveInfo: "حفظ المعلومات",
      noPatientsYet: "لا توجد بيانات مرضى بعد.",
      noChartYet: "لا توجد بيانات لعرض رسم الأسنان.",
      historyEmpty: "لا يوجد سجل علاجي لهذا المريض حتى الآن.",
      addPhoto: "إضافة صورة",
      noPhotos: "لا توجد صور للمريض بعد.",
      chartTitle: "رسم الأسنان",
      chartMap: "خريطة الأسنان",
      bookingNew: "حجز موعد جديد",
      bookingEdit: "تعديل الموعد",
      newPatient: "مريض جديد",
      newFile: "ملف جديد",
      newFileHint: "سيتم إنشاء ملف مريض جديد مع هذا الموعد مباشرة.",
      patientNameLabel: "اسم المريض",
      patientNamePlaceholder: "اسم المريض",
      fileNumberLabel: "رقم الملف",
      visitTypeLabel: "نوع الموعد",
      customVisitTypeLabel: "نوع الموعد المخصص",
      customVisitTypePlaceholder: "اكتب نوع الموعد",
      dateLabel: "التاريخ",
      timeLabel: "الوقت",
      notesLabel: "ملاحظات",
      notesPlaceholder: "ملاحظات إضافية للمريض",
      confirmBooking: "تأكيد الموعد",
      saveEdit: "حفظ التعديل",
      previousWeek: "الأسبوع السابق",
      nextWeek: "الأسبوع التالي",
      previousMonth: "الشهر السابق",
      nextMonth: "الشهر التالي",
      chartHealthy: "سليم",
      chartFilling: "حشوة",
      chartCrown: "تاج",
      chartMissing: "مفقود",
      chartTreatment: "علاج",
      toothRecord: "سجل هذا السن",
      noToothRecord: "لا يوجد سجل لهذا السن بعد.",
      chooseNewAction: "اختر إجراء جديد",
      otherAction: "غير ذلك",
      writeActionFirst: "اكتب الإجراء أولًا",
      deleteToothRecordTitle: "حذف سجل السن",
      deleteToothRecordMessage: "سيتم حذف هذا الإجراء من سجل هذا السن نهائيًا.",
      deleteToothRecordButton: "حذف السجل",
      confirmActionTitle: "تأكيد الإجراء",
      confirmActionMessage: "هل أنت متأكد من المتابعة؟",
      cancel: "إلغاء",
      confirm: "تأكيد",
      delete: "حذف",
      settings: "الإعدادات",
      language: "اللغة",
      languageArabic: "العربية",
      languageEnglish: "English",
      appointmentBooked: "تم حفظ الموعد",
      appointmentUpdated: "تم تحديث الموعد",
      appointmentDeleted: "تم حذف الموعد",
      appointmentConflict: "هذا الموعد محجوز مسبقًا",
      bookingMissing: "يرجى تعبئة بيانات الموعد الأساسية",
      patientNameRequired: "أدخل اسم المريض",
      patientInfoSaved: "تم تحديث بيانات المريض",
      photoAdded: "تمت إضافة الصورة",
      photoDeleted: "تم حذف الصورة",
      toothRecordDeleted: "تم حذف سجل السن",
      actionSavedPrefix: "تم حفظ",
      actionSavedSuffix: "لهذا السن",
      customActionSaved: "تم حفظ الإجراء",
      durationLabel: "المدة",
      minutes: "دقيقة",
      notesValueLabel: "الملاحظات",
      statusLabel: "الحالة",
      done: "منجز",
      upcoming: "قادم",
    },
    en: {
      home: "Home",
      appointments: "Appointments",
      patients: "Patients",
      nextAppointment: "Next appointment",
      noUpcoming: "No upcoming appointment",
      calmSchedule: "The schedule is quiet right now",
      appointmentsToday: "Today's appointments",
      totalPatients: "Total patients",
      todayAgenda: "Today's agenda",
      noAppointmentsToday: "No appointments for today.",
      patientsTitle: "Patients",
      patientsShown: "patients shown",
      searchName: "Name",
      searchPhone: "Phone",
      searchFileNumber: "File number",
      noSearchResults: "No patients match the current filters.",
      scheduleList: "Today's list",
      noAppointmentsDate: "No appointments for this date.",
      back: "Back",
      latestVisit: "Last visit",
      visits: "Visits",
      visitUnit: "visits",
      infoTab: "Info",
      chartTab: "Dental chart",
      historyTab: "Treatment log",
      photosTab: "Photos",
      contactInfo: "Contact info",
      phoneLabel: "Phone",
      joinDateLabel: "Registration date",
      phonePlaceholder: "Can be added later",
      saveInfo: "Save details",
      noPatientsYet: "No patient data available yet.",
      noChartYet: "No chart data to display yet.",
      historyEmpty: "No treatment history for this patient yet.",
      addPhoto: "Add photo",
      noPhotos: "No photos for this patient yet.",
      chartTitle: "Dental chart",
      chartMap: "Dental map",
      bookingNew: "Book new appointment",
      bookingEdit: "Edit appointment",
      newPatient: "New patient",
      newFile: "New file",
      newFileHint: "A new patient file will be created with this appointment.",
      patientNameLabel: "Patient name",
      patientNamePlaceholder: "Patient name",
      fileNumberLabel: "File number",
      visitTypeLabel: "Visit type",
      customVisitTypeLabel: "Custom visit type",
      customVisitTypePlaceholder: "Type visit name",
      dateLabel: "Date",
      timeLabel: "Time",
      notesLabel: "Notes",
      notesPlaceholder: "Additional notes",
      confirmBooking: "Confirm appointment",
      saveEdit: "Save changes",
      previousWeek: "Previous week",
      nextWeek: "Next week",
      previousMonth: "Previous month",
      nextMonth: "Next month",
      chartHealthy: "Healthy",
      chartFilling: "Filling",
      chartCrown: "Crown",
      chartMissing: "Missing",
      chartTreatment: "Treatment",
      toothRecord: "This tooth log",
      noToothRecord: "No history for this tooth yet.",
      chooseNewAction: "Choose a new action",
      otherAction: "Other",
      writeActionFirst: "Type the action first",
      deleteToothRecordTitle: "Delete tooth record",
      deleteToothRecordMessage: "This entry will be removed from this tooth record permanently.",
      deleteToothRecordButton: "Delete record",
      confirmActionTitle: "Confirm action",
      confirmActionMessage: "Are you sure you want to continue?",
      cancel: "Cancel",
      confirm: "Confirm",
      delete: "Delete",
      settings: "Settings",
      language: "Language",
      languageArabic: "Arabic",
      languageEnglish: "English",
      appointmentBooked: "Appointment saved",
      appointmentUpdated: "Appointment updated",
      appointmentDeleted: "Appointment deleted",
      appointmentConflict: "This time is already booked",
      bookingMissing: "Please fill in the required appointment details",
      patientNameRequired: "Enter the patient name",
      patientInfoSaved: "Patient details updated",
      photoAdded: "Photo added",
      photoDeleted: "Photo deleted",
      toothRecordDeleted: "Tooth record deleted",
      actionSavedPrefix: "Saved",
      actionSavedSuffix: "for this tooth",
      customActionSaved: "Action saved",
      durationLabel: "Duration",
      minutes: "min",
      notesValueLabel: "Notes",
      statusLabel: "Status",
      done: "Done",
      upcoming: "Upcoming",
    },
  };
  const VISIT_TRANSLATIONS = {
    كشف: "Check-up",
    "تنظيف وتلميع الأسنان": "Scaling & polishing",
    "حشوة تجميلية": "Tooth-colored filling",
    "تقويم ومراجعة": "Orthodontic review",
    "خلع جراحي": "Surgical extraction",
    "علاج عصب": "Root canal treatment",
    "استشارة عامة": "Consultation",
    "غير ذلك": "Other",
    "فحص ومراجعة": "Clinical check-up",
    "كشف ومراجعة": "Follow-up check-up",
  };
  const STATUS_TRANSLATIONS = {
    "نشط": "Active",
    "مواعيد قائمة": "Scheduled",
    "متابعة": "Follow-up",
    "موعد اليوم": "Today's visit",
    "جديد": "New",
    "منجز": "Done",
    "قادم": "Upcoming",
  };
  const TOOTH_TYPE_TRANSLATIONS = {
    I: { ar: "قاطع", en: "Incisor" },
    C: { ar: "ناب", en: "Canine" },
    P: { ar: "ضاحك", en: "Premolar" },
    M: { ar: "ضرس", en: "Molar" },
    W: { ar: "عقل", en: "Wisdom" },
  };
  const TOOTH_SIDE_TRANSLATIONS = {
    UR: { ar: "يمين علوي", en: "Upper right" },
    UL: { ar: "يسار علوي", en: "Upper left" },
    LR: { ar: "يمين سفلي", en: "Lower right" },
    LL: { ar: "يسار سفلي", en: "Lower left" },
  };
  let selectedToothId = null;
  let currentChartContainer = null;
  let pendingConfirmAction = null;

  function uid(prefix) {
    return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7);
  }

  function toDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function todayKey() {
    return toDateKey(new Date());
  }

  function isArabic() {
    return state.language !== "en";
  }

  function localeTag() {
    return isArabic() ? "ar-AE" : "en-US";
  }

  function t(key) {
    const pack = TEXT[state.language] || TEXT.ar;
    return pack[key] || TEXT.ar[key] || key;
  }

  function displayVisitType(value) {
    return state.language === "en" ? VISIT_TRANSLATIONS[value] || value : value;
  }

  function displayStatus(value) {
    return state.language === "en" ? STATUS_TRANSLATIONS[value] || value : value;
  }

  function displayToothType(typeId) {
    const entry = TOOTH_TYPE_TRANSLATIONS[typeId];
    return entry ? entry[state.language] || entry.ar : typeId;
  }

  function displayToothSide(sideId) {
    const entry = TOOTH_SIDE_TRANSLATIONS[sideId];
    return entry ? entry[state.language] || entry.ar : sideId;
  }

  function displayActionName(actionId, customLabel) {
    if (actionId === "custom") return customLabel || t("otherAction");
    if (state.language === "ar") return (ACTION_MAP[actionId] && ACTION_MAP[actionId].name) || actionId;
    const labels = {
      exam: "Check-up",
      cleaning: "Scaling",
      filling: "Filling",
      rct: "Root canal",
      crown: "Crown",
      missing: "Missing",
      fracture: "Fractured",
      sensitive: "Sensitivity",
      watch: "Follow-up",
    };
    return labels[actionId] || actionId;
  }

  function backArrow() {
    return isArabic() ? icon("chevron-right") : icon("chevron-left");
  }

  function navArrow(direction) {
    if (direction === "prev") return isArabic() ? icon("chevron-right") : icon("chevron-left");
    return isArabic() ? icon("chevron-left") : icon("chevron-right");
  }

  function applyLanguageDirection() {
    document.documentElement.lang = state.language;
    document.documentElement.dir = isArabic() ? "rtl" : "ltr";
    document.title = APP_TITLE;
  }

  function formatLongDate(dateKey) {
    return new Intl.DateTimeFormat(localeTag(), {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateKey + "T12:00:00"));
  }

  function formatShortDate(dateKey) {
    return new Intl.DateTimeFormat(localeTag(), { month: "short", day: "numeric" }).format(
      new Date(dateKey + "T12:00:00")
    );
  }

  function formatMonthYear(dateKey) {
    return new Intl.DateTimeFormat(localeTag(), {
      year: "numeric",
      month: "long",
    }).format(new Date(dateKey + "T12:00:00"));
  }

  function formatDayName(dateKey) {
    return new Intl.DateTimeFormat(localeTag(), { weekday: "short" }).format(new Date(dateKey + "T12:00:00"));
  }

  function formatTime(time) {
    const parts = time.split(":").map(Number);
    const date = new Date(2026, 0, 1, parts[0], parts[1]);
    return new Intl.DateTimeFormat(localeTag(), {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }

  function formatEntryDate(dateValue) {
    const raw = String(dateValue || "").trim();
    if (!raw) return "";
    const normalized = raw.replace(/\//g, "-").replace(" ", "T");
    const parsed = new Date(normalized);
    if (Number.isNaN(parsed.getTime())) return raw;
    return new Intl.DateTimeFormat(localeTag(), {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(parsed);
  }

  function timeToMinutes(time) {
    const parts = time.split(":").map(Number);
    return parts[0] * 60 + parts[1];
  }

  function currentMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  function createPhotoPlaceholder(title, accent, bg) {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="720" height="520" viewBox="0 0 720 520">' +
      '<rect width="720" height="520" rx="36" fill="' +
      bg +
      '"/>' +
      '<circle cx="130" cy="120" r="48" fill="' +
      accent +
      '" opacity="0.14"/>' +
      '<circle cx="598" cy="380" r="62" fill="' +
      accent +
      '" opacity="0.1"/>' +
      '<text x="360" y="238" text-anchor="middle" font-size="42" fill="' +
      accent +
      '" font-family="Cairo, Arial" font-weight="700">' +
      title +
      "</text>" +
      '<text x="360" y="298" text-anchor="middle" font-size="22" fill="#64748b" font-family="Cairo, Arial">سجل المريض</text>' +
      "</svg>";
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function icon(name) {
    const icons = {
      home: '<rect x="3" y="11" width="7" height="10" rx="1"/><rect x="10" y="3" width="11" height="18" rx="1"/>',
      calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
      users: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/>',
      edit: '<path d="m4 20 4.5-1 9-9-3.5-3.5-9 9L4 20Z"/><path d="m13.5 6.5 3.5 3.5"/>',
      trash: '<path d="M7 7.5h10"/><path d="M9 7.5V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5"/><path d="M8 10v7"/><path d="M12 10v7"/><path d="M16 10v7"/><path d="M6.5 7.5h11l-.7 11a1.5 1.5 0 0 1-1.5 1.4H8.7a1.5 1.5 0 0 1-1.5-1.4l-.7-11Z"/>',
      plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
      settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z"/>',
      "chevron-right": '<path d="m9 6 6 6-6 6"/>',
      "chevron-left": '<path d="m15 6-6 6 6 6"/>',
      check: '<path d="M5 12.5 9.2 17 19 7"/>',
      tooth: '<path d="M7.8 3.5c2-.6 3.5.5 4.7.5s2.7-1.1 4.7-.5c3 .9 4.7 4.1 4 7.7-.5 2.3-1.6 4.1-2.1 6.5-.7 2.8-1.3 5.7-3.3 5.7-1.5 0-1.4-2.7-2.6-2.7s-1.1 2.7-2.6 2.7c-2 0-2.6-2.9-3.3-5.7-.5-2.4-1.6-4.2-2.1-6.5-.7-3.6 1-6.8 4-7.7Z"/>',
      image: '<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m20 15-4.5-4.5L8 18"/>',
    };
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + (icons[name] || icons.tooth) + "</svg>";
  }

  function actionIcon(action) {
    const stroke = action.stroke || "#2563a8";
    const glyphs = {
      exam: '<circle cx="10" cy="10" r="4"/><path d="m21 21-5.2-5.2"/>',
      cleaning: '<path d="M12 3v4"/><path d="M12 17v4"/><path d="M5 12H1"/><path d="M23 12h-4"/><path d="m5.6 5.6 2.8 2.8"/><path d="m15.6 15.6 2.8 2.8"/><path d="m18.4 5.6-2.8 2.8"/><path d="m8.4 15.6-2.8 2.8"/>',
      filling: '<path d="M7 7h10v10H7z"/><path d="M9.5 9.5h5v5h-5z"/>',
      rct: '<path d="M12 4v16"/><path d="M8 8h8"/><path d="M8 16h8"/>',
      crown: '<path d="M4 18 6.5 7l5.5 5 5.5-5L20 18Z"/>',
      missing: '<path d="m6 6 12 12"/><path d="M18 6 6 18"/>',
      fracture: '<path d="M10 4 7 11h4l-2 9 8-11h-4l2-5"/>',
      sensitive: '<path d="M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
      watch: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2.5"/>',
    };
    return '<span class="tooth-action-icon" style="color:' + stroke + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + (glyphs[action.id] || glyphs.watch) + "</svg></span>";
  }

  function initials(name) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("");
  }

  const appPatients = [];

  let appAppointments = [];
  const storageState = {
    initialized: false,
    mode: "local",
    plugin: null,
    writeQueue: Promise.resolve(),
  };

  const state = {
    currentPage: "page-home",
    pageHistory: ["page-home"],
    profilePatientId: null,
    profileTab: "info",
    selectedDate: todayKey(),
    bookingDraft: null,
    bookingMonth: new Date().getMonth(),
    bookingYear: new Date().getFullYear(),
    toothMenu: null,
    patientFilters: {
      name: "",
      phone: "",
      fileNumber: "",
    },
    patientForm: null,
    language: "ar",
    settingsOpen: false,
    timePicker: null,
  };

  function normalizeLookup(value) {
    return String(value || "").toLowerCase().replace(/[\s#-]/g, "");
  }

  function normalizePatient(patient, index) {
    const normalizedFile = String(patient.fileNumber || "").trim() || ("#" + String(index + 1));
    patient.fileNumber = normalizedFile;
    patient.recordNumber = normalizedFile;
    patient.age = patient.age || "--";
    patient.gender = patient.gender || "غير محدد";
    patient.phone = patient.phone || "";
    patient.joinDate = patient.joinDate || new Intl.DateTimeFormat("ar-AE", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    patient.status = patient.status || "جديد";
    patient.photos = patient.photos || [];
    patient.toothStates = patient.toothStates || {};
    patient.toothHistory = patient.toothHistory || {};
    return patient;
  }

  function normalizePatients() {
    appPatients.forEach(function (patient, index) {
      normalizePatient(patient, index);
    });
  }

  function normalizeAppointments(list) {
    return list.map(function (appointment) {
      const price = Number(appointment.price) || 0;
      const paidAmount = Number.isFinite(Number(appointment.paidAmount))
        ? Number(appointment.paidAmount)
        : (appointment.date < todayKey() ? price : 0);
      return {
        ...appointment,
        duration: Number(appointment.duration) || 30,
        price: price,
        paidAmount: Math.max(0, Math.min(price, paidAmount)),
      };
    });
  }

  function getCapacitorPlatform() {
    try {
      if (window.Capacitor && typeof window.Capacitor.getPlatform === "function") {
        return window.Capacitor.getPlatform();
      }
    } catch (error) {}
    return "web";
  }

  function isNativeRuntime() {
    try {
      if (window.Capacitor && typeof window.Capacitor.isNativePlatform === "function") {
        return window.Capacitor.isNativePlatform();
      }
    } catch (error) {}
    const platform = getCapacitorPlatform();
    return platform === "ios" || platform === "android";
  }

  function getSQLitePlugin() {
    try {
      return window.Capacitor && window.Capacitor.Plugins
        ? window.Capacitor.Plugins.CapacitorSQLite || null
        : null;
    } catch (error) {
      return null;
    }
  }

  function readLegacyStorageValue(keys) {
    for (const key of keys) {
      try {
        const value = localStorage.getItem(key);
        if (value !== null && value !== "") return value;
      } catch (error) {}
    }
    return null;
  }

  async function ensureSQLiteReady() {
    if (storageState.initialized) return storageState.mode;
    storageState.initialized = true;
    if (!isNativeRuntime()) return storageState.mode;
    const plugin = getSQLitePlugin();
    if (!plugin) return storageState.mode;
    try {
      const database = SQLITE_CONFIG.database;
      let hasConnection = false;
      if (typeof plugin.checkConnectionsConsistency === "function") {
        try {
          await plugin.checkConnectionsConsistency();
        } catch (error) {}
      }
      if (typeof plugin.isConnection === "function") {
        try {
          const result = await plugin.isConnection({ database: database, readonly: false });
          hasConnection = !!(result && result.result);
        } catch (error) {}
      }
      if (!hasConnection && typeof plugin.createConnection === "function") {
        await plugin.createConnection({
          database: database,
          version: SQLITE_CONFIG.version,
          encrypted: false,
          mode: "no-encryption",
          readonly: false,
        });
      } else if (hasConnection && typeof plugin.retrieveConnection === "function") {
        await plugin.retrieveConnection({ database: database, readonly: false });
      }
      if (typeof plugin.open === "function") {
        try {
          await plugin.open({ database: database, readonly: false });
        } catch (error) {}
      }
      if (typeof plugin.execute === "function") {
        await plugin.execute({
          database: database,
          statements:
            "CREATE TABLE IF NOT EXISTS " + SQLITE_CONFIG.table + " (" +
            "storage_key TEXT PRIMARY KEY NOT NULL, " +
            "storage_value TEXT NOT NULL" +
            ");",
        });
      }
      storageState.plugin = plugin;
      storageState.mode = "sqlite";
      await migrateLegacyStorageToSQLite();
    } catch (error) {
      storageState.plugin = null;
      storageState.mode = "local";
    }
    return storageState.mode;
  }

  async function readSQLiteValue(key) {
    if (!storageState.plugin || typeof storageState.plugin.query !== "function") return null;
    const result = await storageState.plugin.query({
      database: SQLITE_CONFIG.database,
      statement: "SELECT storage_value FROM " + SQLITE_CONFIG.table + " WHERE storage_key = ? LIMIT 1;",
      values: [key],
    });
    const rows = result && (Array.isArray(result.values) ? result.values : Array.isArray(result.rows) ? result.rows : []);
    if (!rows.length) return null;
    const row = rows[0];
    return row ? row.storage_value : null;
  }

  async function writeSQLiteValue(key, value) {
    if (!storageState.plugin || typeof storageState.plugin.run !== "function") return;
    await storageState.plugin.run({
      database: SQLITE_CONFIG.database,
      statement:
        "INSERT OR REPLACE INTO " + SQLITE_CONFIG.table + " (storage_key, storage_value) VALUES (?, ?);",
      values: [key, value],
    });
  }

  async function readStoredValue(keyGroup) {
    await ensureSQLiteReady();
    if (storageState.mode === "sqlite") {
      const sqliteValue = await readSQLiteValue(keyGroup[0]);
      if (sqliteValue !== null) return sqliteValue;
    }
    return readLegacyStorageValue(keyGroup);
  }

  async function writeStoredValue(key, value) {
    await ensureSQLiteReady();
    if (storageState.mode === "sqlite") {
      await writeSQLiteValue(key, value);
      return;
    }
    try {
      localStorage.setItem(key, value);
    } catch (error) {}
  }

  async function migrateLegacyStorageToSQLite() {
    if (storageState.mode !== "sqlite") return;
    const groups = Object.values(LEGACY_STORAGE_KEYS);
    for (const keyGroup of groups) {
      const sqliteValue = await readSQLiteValue(keyGroup[0]);
      if (sqliteValue !== null) continue;
      const legacyValue = readLegacyStorageValue(keyGroup);
      if (legacyValue !== null) {
        await writeSQLiteValue(keyGroup[0], legacyValue);
      }
    }
  }

  function persistData() {
    const snapshot = {
      patients: JSON.stringify(appPatients),
      appointments: JSON.stringify(appAppointments),
      language: state.language,
    };
    storageState.writeQueue = storageState.writeQueue
      .then(async function () {
        await writeStoredValue(STORAGE_KEYS.patients, snapshot.patients);
        await writeStoredValue(STORAGE_KEYS.appointments, snapshot.appointments);
        await writeStoredValue(STORAGE_KEYS.language, snapshot.language);
      })
      .catch(function () {});
    return storageState.writeQueue;
  }

  async function loadPersistedData() {
    try {
      const savedLanguage = await readStoredValue(LEGACY_STORAGE_KEYS.language);
      if (LANGUAGE_OPTIONS.includes(savedLanguage)) state.language = savedLanguage;
      const savedPatients = JSON.parse((await readStoredValue(LEGACY_STORAGE_KEYS.patients)) || "null");
      if (Array.isArray(savedPatients)) {
        appPatients.splice(0, appPatients.length);
        savedPatients.forEach(function (patient, index) {
          appPatients.push(normalizePatient(patient, index));
        });
      }
      const savedAppointments = JSON.parse((await readStoredValue(LEGACY_STORAGE_KEYS.appointments)) || "null");
      if (Array.isArray(savedAppointments)) {
        appAppointments = normalizeAppointments(savedAppointments);
      }
    } catch (error) {}
    if (!Array.isArray(appAppointments)) appAppointments = [];
    normalizePatients();
  }

  function nextPatientFileNumber() {
    const highest = appPatients.reduce(function (max, patient) {
      const value = parseInt(String(patient.fileNumber || "").replace(/\D/g, ""), 10);
      return Number.isFinite(value) ? Math.max(max, value) : max;
    }, 0);
    return "#" + String(highest + 1);
  }

  function getPatientAccountSummary(patientId) {
    const items = getPatientAppointments(patientId);
    const total = items.reduce(function (sum, item) { return sum + (item.price || 0); }, 0);
    const paid = items.reduce(function (sum, item) { return sum + getDisplayPaidAmount(item); }, 0);
    const remaining = Math.max(0, total - paid);
    return { total, paid, remaining, count: items.length };
  }

  function getPatientById(patientId) {
    return appPatients.find((patient) => patient.id === patientId);
  }

  function getJoinedAppointments() {
    return appAppointments
      .map((appointment) => ({ ...appointment, patient: getPatientById(appointment.patientId) }))
      .filter((appointment) => appointment.patient);
  }

  function appointmentEnd(appointment) {
    return timeToMinutes(appointment.time) + appointment.duration;
  }

  function appointmentStatus(appointment) {
    if (appointment.date < todayKey()) return t("done");
    if (appointment.date > todayKey()) return t("upcoming");
    return appointmentEnd(appointment) <= currentMinutes() ? t("done") : t("upcoming");
  }

  function appointmentTone(visitType) {
    if (visitType.includes("تنظيف")) return "#0f7d6b";
    if (visitType.includes("حشوة")) return "#5a3fa0";
    if (visitType.includes("عصب")) return "#b86a00";
    if (visitType.includes("خلع")) return "#c0392b";
    return "#2563a8";
  }

  function getAppointmentsForDate(dateKey) {
    const sameDate = getJoinedAppointments().filter((appointment) => appointment.date === dateKey);
    return sameDate.sort((left, right) => {
      const leftRank = appointmentStatus(left) === t("upcoming") ? 0 : 1;
      const rightRank = appointmentStatus(right) === t("upcoming") ? 0 : 1;
      if (dateKey === todayKey() && leftRank !== rightRank) return leftRank - rightRank;
      return timeToMinutes(left.time) - timeToMinutes(right.time);
    });
  }

  function getNextAppointment() {
    return getJoinedAppointments()
      .filter((appointment) => appointment.date > todayKey() || (appointment.date === todayKey() && appointmentEnd(appointment) > currentMinutes()))
      .sort((left, right) => (left.date + " " + left.time).localeCompare(right.date + " " + right.time))[0];
  }

  function getPatientAppointments(patientId) {
    return getJoinedAppointments()
      .filter((appointment) => appointment.patientId === patientId)
      .sort((left, right) => (right.date + " " + right.time).localeCompare(left.date + " " + left.time));
  }

  function getAllTeeth() {
    return buildUpperPositions().concat(buildLowerPositions());
  }

  function findToothById(toothId) {
    return getAllTeeth().find(function (tooth) { return tooth.id === toothId; });
  }

  function getPatientToothEntries(patient) {
    return Object.keys(patient.toothHistory || {}).flatMap(function (toothId) {
      const tooth = findToothById(toothId);
      return getToothHistory(patient, toothId).map(function (entry, index) {
        return {
          ...entry,
          toothId: toothId,
          tooth: tooth,
          rank: entry.createdAt || (Date.now() - index),
        };
      });
    }).sort(function (left, right) {
      return (right.rank || 0) - (left.rank || 0);
    });
  }

  function getLatestToothEntries(patient) {
    const seen = new Set();
    return getPatientToothEntries(patient).filter(function (entry) {
      if (seen.has(entry.toothId)) return false;
      seen.add(entry.toothId);
      return true;
    }).slice(0, 8);
  }

  function getDisplayPaidAmount(appointment) {
    return Math.max(0, Math.min(Number(appointment.price) || 0, Number(appointment.paidAmount) || 0));
  }

  function getPatientLastVisit(patientId) {
    return getPatientAppointments(patientId)[0];
  }

  function getToothEntryLabel(entry) {
    if (!entry) return t("chartHealthy");
    if (entry.stateId === "custom" && entry.label) return entry.label;
    return displayActionName(entry.stateId, entry.label);
  }

  function getCurrentToothLabel(patient, toothId) {
    const latest = getToothHistory(patient, toothId)[0];
    if (latest) return getToothEntryLabel(latest);
    const stateId = getToothState(patient, toothId);
    return ACTION_MAP[stateId] ? displayActionName(stateId) : t("chartHealthy");
  }

  function getPatientVisitCount(patientId) {
    return appAppointments.filter((appointment) => appointment.patientId === patientId).length;
  }

  function ensureBookingDraft(patientId) {
    if (!state.bookingDraft) {
      state.bookingDraft = {
        editingId: null,
        patientId: patientId || "__new__",
        date: state.selectedDate,
        time: "10:30",
        duration: 30,
        visitType: VISIT_OPTIONS[0],
        customVisitType: "",
        notes: "",
        price: 200,
        newPatientName: "",
        newPatientPhone: "",
        newPatientFileNumber: "",
      };
    }
    if (patientId && !state.bookingDraft.patientId) state.bookingDraft.patientId = patientId;
    if (state.bookingDraft.patientId === "__new__") {
      if (!state.bookingDraft.newPatientFileNumber) state.bookingDraft.newPatientFileNumber = nextPatientFileNumber();
    }
    const date = new Date(state.bookingDraft.date + "T12:00:00");
    state.bookingMonth = date.getMonth();
    state.bookingYear = date.getFullYear();
  }

  function ensureOverlays() {
    const shell = document.querySelector(".phone-shell");
    if (!document.getElementById("tooth-menu-overlay")) {
      shell.insertAdjacentHTML(
        "beforeend",
        '<div class="tooth-menu-overlay" id="tooth-menu-overlay">' +
          '<div class="tooth-menu-backdrop"></div>' +
          '<div class="tooth-menu" id="tooth-menu">' +
            '<div class="tooth-menu-header">' +
              '<div class="tooth-id" id="tmenu-title">سن</div>' +
              '<div class="tooth-loc" id="tmenu-loc"></div>' +
            "</div>" +
            '<div id="tmenu-items"></div>' +
          "</div>" +
        "</div>"
      );
    }
    if (!document.getElementById("app-toast")) {
      shell.insertAdjacentHTML("beforeend", '<div class="app-toast" id="app-toast"></div>');
    }
    if (!document.getElementById("viewer-overlay")) {
      shell.insertAdjacentHTML(
        "beforeend",
        '<div class="viewer-overlay" id="viewer-overlay">' +
          '<button class="viewer-close" type="button" onclick="closeViewer()">×</button>' +
          '<div class="viewer-card"><img id="viewer-image" alt="صورة المريض" /><div class="viewer-meta"><strong id="viewer-title"></strong><span id="viewer-date"></span></div></div>' +
          "</div>"
      );
    }
    if (!document.getElementById("confirm-overlay")) {
      shell.insertAdjacentHTML(
        "beforeend",
        '<div class="confirm-overlay" id="confirm-overlay">' +
          '<div class="confirm-backdrop" onclick="closeConfirmDialog()"></div>' +
          '<div class="confirm-card">' +
            '<div class="confirm-icon">' + icon("tooth") + "</div>" +
            '<strong class="confirm-title" id="confirm-title">' + t("confirmActionTitle") + '</strong>' +
            '<p class="confirm-message" id="confirm-message">' + t("confirmActionMessage") + '</p>' +
            '<div class="confirm-actions">' +
              '<button class="btn-secondary" type="button" onclick="closeConfirmDialog()">' + t("cancel") + '</button>' +
              '<button class="btn-danger" id="confirm-submit" type="button" onclick="approveConfirmDialog()">' + t("delete") + '</button>' +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }
    if (!document.getElementById("time-picker-overlay")) {
      shell.insertAdjacentHTML("beforeend", '<div class="time-picker-overlay" id="time-picker-overlay"></div>');
    }
  }

  function openConfirmDialog(options) {
    const overlay = document.getElementById("confirm-overlay");
    if (!overlay) return;
    pendingConfirmAction = options.onConfirm || null;
    document.getElementById("confirm-title").textContent = options.title || t("confirmActionTitle");
    document.getElementById("confirm-message").textContent = options.message || t("confirmActionMessage");
    document.getElementById("confirm-submit").textContent = options.confirmText || t("confirm");
    overlay.classList.add("show");
  }

  function closeConfirmDialog() {
    pendingConfirmAction = null;
    const overlay = document.getElementById("confirm-overlay");
    if (overlay) overlay.classList.remove("show");
  }

  function approveConfirmDialog() {
    const action = pendingConfirmAction;
    closeConfirmDialog();
    if (action) action();
  }

  function showToast(message) {
    const toast = document.getElementById("app-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  function navIcon(pageId, activeId, name, label) {
    const active = activeId === pageId;
    return (
      '<div class="bn-item ' +
      (active ? "active" : "") +
      '" onclick="navTo(\'' +
      pageId +
      "')\">" +
      '<span class="' +
      (active ? "bn-icon-active" : "bn-icon") +
      '">' +
      icon(name) +
      "</span>" +
      '<span style="' +
      (active ? "color:var(--blue-mid)" : "") +
      '">' +
      label +
      "</span></div>"
    );
  }

  function bottomNav(activeId) {
    return (
      '<div class="bottom-nav">' +
      navIcon("page-home", activeId, "home", t("home")) +
      navIcon("page-appointments", activeId, "calendar", t("appointments")) +
      navIcon("page-patients", activeId, "users", t("patients")) +
      "</div>"
    );
  }

  function appointmentActions(appointment) {
    return (
      '<div class="agenda-actions">' +
      '<button class="mini-round-btn" type="button" onclick="event.stopPropagation(); startEditAppointment(\'' +
      appointment.id +
      "')\">" +
      icon("edit") +
      "</button>" +
      '<button class="mini-round-btn" type="button" onclick="event.stopPropagation(); deleteAppointment(\'' +
      appointment.id +
      "')\">" +
      icon("trash") +
      "</button></div>"
    );
  }

  function renderAgendaCard(appointment) {
    const patientInfo = appointment.patient.fileNumber + (appointment.patient.phone ? " · " + appointment.patient.phone : "");
    return (
      '<div class="agenda-card" onclick="openPatientProfile(\'' +
      appointment.patientId +
      "')\">" +
      '<div class="agenda-time"><strong>' +
      formatTime(appointment.time).split(" ")[0] +
      "</strong><span>" +
      formatTime(appointment.time).split(" ")[1] +
      "</span></div>" +
      '<div class="agenda-dot" style="background:' +
      appointmentTone(appointment.visitType) +
      '"></div>' +
      '<div class="agenda-main"><h3>' +
      appointment.patient.name +
      "</h3><p>" +
      displayVisitType(appointment.visitType) +
      "</p><small>" +
      patientInfo +
      "</small></div>" +
      appointmentActions(appointment) +
      "</div>"
    );
  }

  function renderHomePage() {
    const page = document.getElementById("page-home");
    const next = getNextAppointment();
    const todayAppointments = getAppointmentsForDate(todayKey());
    page.innerHTML =
      '<div class="home-header nav-header" style="background:var(--blue);padding:36px 20px 20px">' +
      '<div class="nav-header-top"><div class="home-identity"><div class="doctor-mark">' +
      icon("tooth") +
      '</div><div class="doctor-copy"><div class="doctor-name"><span>' +
      (DOCTOR_NAME[state.language] || DOCTOR_NAME.ar) +
      '</span><span class="doctor-heart">❤</span></div></div></div><div class="header-actions-stack" onclick="event.stopPropagation()"><button class="header-settings-btn" type="button" aria-label="' +
      t("settings") +
      '" onclick="toggleSettingsMenu(event)">' +
      icon("settings") +
      '</button><button class="header-plus-btn" type="button" onclick="startNewAppointment(\'__new__\')">' +
      icon("plus") +
      '</button>' +
      (state.settingsOpen ? renderSettingsMenu() : "") +
      "</div></div>" +
      '<div class="next-apt-card"><div class="lbl">' + t("nextAppointment") + '</div><div class="name">' +
      (next ? next.patient.name : t("noUpcoming")) +
      "</div><div class=\"detail\">" +
      (next ? formatLongDate(next.date) + " · " + formatTime(next.time) + " · " + displayVisitType(next.visitType) : t("calmSchedule")) +
      "</div></div></div>" +
      '<div class="home-body"><div class="stats-grid">' +
      '<div class="stat-card blue"><div class="stat-card-head"><div class="stat-icon">' +
      icon("calendar") +
      '</div></div><div class="stat-copy"><div class="num">' +
      todayAppointments.length +
      '</div><div class="stat-lbl">' + t("appointmentsToday") + '</div></div></div>' +
      '<div class="stat-card green"><div class="stat-card-head"><div class="stat-icon">' +
      icon("users") +
      '</div></div><div class="stat-copy"><div class="num">' +
      appPatients.length +
      '</div><div class="stat-lbl">' + t("totalPatients") + '</div></div></div></div>' +
      '<div class="section-title">' + t("todayAgenda") + '</div>' +
      (todayAppointments.length ? todayAppointments.map(renderAgendaCard).join("") : '<div class="empty-state">' + t("noAppointmentsToday") + '</div>') +
      "</div>" +
      bottomNav("page-home");
  }

  function renderSettingsMenu() {
    return (
      '<div class="settings-popover">' +
      '<div class="settings-popover-title">' + t("settings") + '</div>' +
      '<div class="settings-item"><span class="settings-label">' + t("language") + '</span><div class="settings-options">' +
      renderLanguageOption("ar", t("languageArabic")) +
      renderLanguageOption("en", t("languageEnglish")) +
      "</div></div></div>"
    );
  }

  function renderLanguageOption(languageId, label) {
    return (
      '<button class="settings-option ' +
      (state.language === languageId ? "active" : "") +
      '" type="button" onclick="setLanguage(\'' +
      languageId +
      "')\"><span>" +
      label +
      '</span>' +
      (state.language === languageId ? '<span class="settings-check">' + icon("check") + "</span>" : "") +
      "</button>"
    );
  }

  function renderAppointmentsPage() {
    const page = document.getElementById("page-appointments");
    const days = Array.from({ length: 7 }, function (_, index) {
      return toDateKey(addDays(new Date(state.selectedDate + "T12:00:00"), index - 3));
    });
    const items = getAppointmentsForDate(state.selectedDate);
    page.innerHTML =
      '<div class="nav-header"><div class="nav-header-top"><div><h1>' + t("appointments") + '</h1><p>' +
      formatLongDate(state.selectedDate) +
      '</p></div><button class="header-plus-btn" type="button" onclick="startNewAppointment(\'__new__\')">' +
      icon("plus") +
      '</button></div></div><div class="date-strip"><div class="date-strip-header">' +
      '<button class="date-strip-nav" type="button" aria-label="' + t("previousWeek") + '" onclick="shiftSelectedDate(-7)">' +
      navArrow("prev") +
      '</button><div class="date-strip-title">' +
      formatMonthYear(state.selectedDate) +
      '</div><button class="date-strip-nav" type="button" aria-label="' + t("nextWeek") + '" onclick="shiftSelectedDate(7)">' +
      navArrow("next") +
      '</button></div><div class="date-strip-days">' +
      days
        .map(function (dateKey) {
          return (
            '<button class="date-pill ' +
            (dateKey === state.selectedDate ? "active" : "") +
            '" type="button" onclick="setSelectedDate(\'' +
            dateKey +
            "')\">" +
            '<span class="weekday">' +
            formatDayName(dateKey) +
            '</span><span class="daynum">' +
            new Date(dateKey + "T12:00:00").getDate() +
            "</span></button>"
          );
        })
        .join("") +
      "</div>" +
      '</div><div class="soft-section"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
      '<div class="section-title" style="margin:0">' + t("scheduleList") + '</div>' +
      '</div><div class="agenda-list">' +
      (items.length ? items.map(renderAgendaCard).join("") : '<div class="empty-state">' + t("noAppointmentsDate") + '</div>') +
      "</div></div>" +
      bottomNav("page-appointments");
  }

  function renderPatientsPage() {
    const page = document.getElementById("page-patients");
    page.innerHTML =
      '<div class="nav-header" style="background:var(--blue);padding-bottom:0">' +
      '<div class="nav-header-top"><div><h1>' + t("patientsTitle") + '</h1><p><span id="patients-visible-count">0</span> ' + t("patientsShown") + '</p></div></div>' +
      '<div class="search-bar" style="padding:12px 0 16px"><div class="patient-search-grid">' +
      renderPatientSearchField("name", t("searchName"), state.patientFilters.name) +
      renderPatientSearchField("phone", t("searchPhone"), state.patientFilters.phone) +
      renderPatientSearchField("fileNumber", t("searchFileNumber"), state.patientFilters.fileNumber) +
      "</div></div></div>" +
      '<div class="patients-list" id="patients-listing"></div>' +
      bottomNav("page-patients");
    renderPatientsList();
  }

  function renderPatientSearchField(key, placeholder, value) {
    return `
      <label class="patient-search-field">
        <div class="search-input-wrap">
          <span>${icon("search")}</span>
          <input
            id="patient-search-${key}"
            value="${String(value || "")}"
            placeholder="${placeholder}"
            oninput="updatePatientFilter('${key}', this.value)"
            autocomplete="off"
          >
        </div>
      </label>
    `;
  }

  function getFilteredPatients() {
    return appPatients.filter(function (patient) {
      if (state.patientFilters.name && !normalizeLookup(patient.name).includes(normalizeLookup(state.patientFilters.name))) return false;
      if (state.patientFilters.phone && !normalizeLookup(patient.phone).includes(normalizeLookup(state.patientFilters.phone))) return false;
      if (state.patientFilters.fileNumber && !normalizeLookup(patient.fileNumber).includes(normalizeLookup(state.patientFilters.fileNumber))) return false;
      return true;
    });
  }

  function renderPatientsList() {
    const list = document.getElementById("patients-listing");
    const count = document.getElementById("patients-visible-count");
    if (!list || !count) return;
    const filtered = getFilteredPatients();
    count.textContent = String(filtered.length);
    list.innerHTML = filtered.length
      ? filtered
          .map(function (patient) {
            return (
              '<div class="patient-card" onclick="openPatientProfile(\'' +
              patient.id +
              "')\">" +
              '<div class="patient-avatar" style="background:' +
              patient.bg +
              ";color:" +
              patient.color +
              '">' +
              initials(patient.name) +
              "</div>" +
              '<div class="patient-info"><div class="patient-name">' +
              patient.name +
              "</div><div class=\"patient-meta\">" +
              patient.fileNumber +
              (patient.phone ? " · " + patient.phone : "") +
              "</div></div>" +
              '<div class="patient-status ' +
              (patient.status === "نشط" ? "status-active" : "status-pending") +
              '">' +
              displayStatus(patient.status) +
              "</div></div>"
            );
          })
          .join("")
      : '<div class="empty-state">' + t(appPatients.length ? "noSearchResults" : "noPatientsYet") + "</div>";
  }

  function renderHistoryCards(patient) {
    const history = getPatientAppointments(patient.id);
    return history.length
      ? history
          .map(function (appointment) {
            return (
              '<div class="hist-card"><div class="hist-card-head"><div class="hist-icon" style="background:' +
              patient.bg +
              ";color:" +
              patient.color +
              '">' +
              icon("tooth") +
              '</div><div class="hist-title-wrap"><div class="hist-title">' +
              displayVisitType(appointment.visitType) +
              '</div><div class="hist-date">' +
              appointment.date +
              " · " +
              formatTime(appointment.time) +
              "</div></div></div><div class=\"hist-card-body\">" +
              '<div class="hist-detail-row"><span class="hist-detail-lbl">' + t("durationLabel") + '</span><span class="hist-detail-val">' +
              appointment.duration +
              " " + t("minutes") + '</span></div>' +
              '<div class="hist-detail-row"><span class="hist-detail-lbl">' + t("notesValueLabel") + '</span><span class="hist-detail-val">' +
              (appointment.notes || "-") +
              '</span></div><div class="hist-detail-row"><span class="hist-detail-lbl">' + t("statusLabel") + '</span><span class="hist-detail-val" style="color:' +
              (appointmentStatus(appointment) === t("upcoming") ? "var(--amber)" : "var(--teal)") +
              '">' +
              appointmentStatus(appointment) +
              "</span></div></div></div>"
            );
          })
          .join("")
      : '<div class="empty-state">' + t("historyEmpty") + "</div>";
  }

  function renderAccountTab(patient) {
    const items = getPatientAppointments(patient.id);
    const summary = getPatientAccountSummary(patient.id);

    return (
      '<div class="account-section">' +
      '<div class="account-summary">' +
      '<div class="account-card ' + (summary.remaining === 0 ? "settled" : "pending") + '"><strong>المتبقي ' + summary.remaining + ' د.إ</strong><span>الحساب</span></div>' +
      '<div class="account-card"><strong>' + summary.total + ' د.إ</strong><span>الإجمالي</span></div>' +
      '<div class="account-card"><strong>' + summary.paid + ' د.إ</strong><span>المدفوع</span></div>' +
      '<div class="account-card"><strong>' + items.length + '</strong><span>إجمالي الحالات</span></div>' +
      '</div>' +
      (items.length
        ? '<div class="account-list">' + items.map(function (item) {
            const paidAmount = getDisplayPaidAmount(item);
            const remainingAmount = Math.max(0, (item.price || 0) - paidAmount);
            return (
              '<div class="account-item">' +
              '<div class="account-item-main"><strong>' + item.visitType + '</strong><span>' + item.date + ' · ' + formatTime(item.time) + '</span>' +
              '<div class="account-payment-meta"><span>مدفوع ' + paidAmount + ' د.إ</span><span>المتبقي ' + remainingAmount + ' د.إ</span></div>' +
              '<div class="account-payment-row"><input class="account-payment-input" type="number" min="0" max="' + (item.price || 0) + '" value="' + paidAmount + '" onchange="saveAppointmentPayment(\'' + item.id + '\', this.value)"><button class="account-pay-btn" type="button" onclick="saveAppointmentPayment(\'' + item.id + '\', ' + (item.price || 0) + ')">تحصيل كامل</button></div></div>' +
              '<b>' + (item.price || 0) + ' د.إ</b>' +
              '</div>'
            );
          }).join("") + '</div>'
        : '<div class="empty-state">لا توجد حالات محسوبة لهذا المريض بعد.</div>') +
      '</div>'
    );
  }

  function renderPhotosTab(patient) {
    return `
      <div class="photo-section">
        <div class="photo-topbar">
          <div class="section-title" style="margin:0">${t("photosTab")}</div>
          <button class="upload-btn" type="button" onclick="document.getElementById('photoUploadInput').click()">${t("addPhoto")}</button>
          <input class="hidden-input" id="photoUploadInput" type="file" accept="image/*">
        </div>
        ${
          patient.photos.length
            ? `<div class="photo-grid-dynamic">
                ${patient.photos
                  .map(function (photo, index) {
                    return `
                      <article class="photo-item ${index === 0 ? "featured" : ""}">
                        <button class="photo-delete" type="button" onclick="event.stopPropagation(); deletePhoto('${patient.id}','${photo.id}')">${icon("trash")}</button>
                        <img src="${photo.src}" alt="${photo.title}" onclick="openViewer('${photo.id}')">
                        <footer onclick="openViewer('${photo.id}')">
                          <strong>${photo.title}</strong>
                          <span>${photo.date}</span>
                        </footer>
                      </article>
                    `;
                  })
                  .join("")}
              </div>`
            : `<div class="empty-state">${t("noPhotos")}</div>`
        }
      </div>
    `;
  }

  function ensurePatientForm(patient) {
    if (!patient) return;
    if (!state.patientForm || state.patientForm.patientId !== patient.id) {
      state.patientForm = {
        patientId: patient.id,
        phone: patient.phone || "",
        joinDate: patient.joinDate || "",
      };
    }
  }

  function setPatientFormField(field, value) {
    if (!state.patientForm) return;
    state.patientForm[field] = value;
  }

  function savePatientInfo() {
    const patient = getPatientById(state.profilePatientId);
    if (!patient || !state.patientForm) return;
    patient.phone = (state.patientForm.phone || "").trim();
    patient.joinDate = (state.patientForm.joinDate || "").trim();
    persistData();
    renderProfilePage();
    showToast(t("patientInfoSaved"));
  }

  function saveAppointmentPayment(appointmentId, value) {
    appAppointments = appAppointments.map(function (appointment) {
      if (appointment.id !== appointmentId) return appointment;
      const amount = Math.max(0, Math.min(Number(appointment.price) || 0, Number(value) || 0));
      return { ...appointment, paidAmount: amount };
    });
    persistData();
    renderProfilePage();
    showToast("تم تحديث الحساب");
  }

  function renderProfilePage() {
    const page = document.getElementById("page-profile");
    const patient = getPatientById(state.profilePatientId) || appPatients[0];
    if (!page || !patient) {
      if (page) page.innerHTML = '<div class="empty-state" style="margin:24px">' + t("noPatientsYet") + "</div>";
      return;
    }
    state.profilePatientId = patient.id;
    if (state.profileTab === "account") state.profileTab = "info";
    ensurePatientForm(patient);
    const lastVisit = getPatientLastVisit(patient.id);
    page.innerHTML = `
      <div class="profile-shell">
        <div class="patient-profile-header nav-header">
          <div class="nav-header-top">
            <div>
              <div class="back-btn" onclick="goBack()">${backArrow()}<span>${t("back")}</span></div>
            </div>
            <button class="header-plus-btn" type="button" onclick="startNewAppointment('${patient.id}')">${icon("plus")}</button>
          </div>
          <div class="profile-row">
            <div class="profile-av" style="background:${patient.bg};color:${patient.color};border-color:rgba(255,255,255,0.15)">${initials(patient.name)}</div>
            <div>
              <div class="profile-av-name">${patient.name}</div>
              <div class="profile-av-id">${patient.fileNumber}${patient.phone ? " · " + patient.phone : ""}</div>
              <div class="profile-badge">${displayStatus(patient.status)}</div>
            </div>
          </div>
          <div class="profile-mini-stats">
            <div class="mini-stat"><div class="ml">${t("latestVisit")}</div><div class="mv">${lastVisit ? formatShortDate(lastVisit.date) : "-"}</div></div>
            <div class="mini-stat"><div class="ml">${t("visits")}</div><div class="mv">${getPatientVisitCount(patient.id)} ${t("visitUnit")}</div></div>
          </div>
        </div>
        <div class="profile-tabs">
          <button class="p-tab ${state.profileTab === "info" ? "active" : ""}" onclick="setProfileTab('info')">${t("infoTab")}</button>
          <button class="p-tab ${state.profileTab === "chart" ? "active" : ""}" onclick="setProfileTab('chart')">${t("chartTab")}</button>
          <button class="p-tab ${state.profileTab === "history" ? "active" : ""}" onclick="setProfileTab('history')">${t("historyTab")}</button>
          <button class="p-tab ${state.profileTab === "photos" ? "active" : ""}" onclick="setProfileTab('photos')">${t("photosTab")}</button>
        </div>
        <div class="profile-body">
          ${
            state.profileTab === "info"
              ? `<div class="tab-content active" style="display:block">
                  <div class="info-section-title">${t("contactInfo")}</div>
                  <label class="info-edit-field"><span class="info-label">${t("phoneLabel")}</span><input class="info-input" value="${state.patientForm ? state.patientForm.phone : patient.phone}" placeholder="${t("phonePlaceholder")}" oninput="setPatientFormField('phone', this.value)"></label>
                  <label class="info-edit-field"><span class="info-label">${t("joinDateLabel")}</span><input class="info-input" value="${state.patientForm ? state.patientForm.joinDate : patient.joinDate}" oninput="setPatientFormField('joinDate', this.value)"></label>
                  <button class="btn-primary" type="button" style="margin-top:14px" onclick="savePatientInfo()">${t("saveInfo")}</button>
                </div>`
              : ""
          }
          ${state.profileTab === "chart" ? '<div class="tab-content active" id="tab-chart" style="padding:0;display:flex;flex-direction:column"></div>' : ""}
          ${state.profileTab === "history" ? `<div class="tab-content active" style="padding:0;display:block"><div class="history-body">${renderHistoryCards(patient)}</div></div>` : ""}
          ${state.profileTab === "photos" ? renderPhotosTab(patient) : ""}
        </div>
      </div>
    `;

    if (state.profileTab === "chart") buildDentalChart("tab-chart", patient.id);
    if (state.profileTab === "photos") {
      const input = document.getElementById("photoUploadInput");
      if (input) input.addEventListener("change", function (event) { addPhoto(event, patient.id); });
    }
  }

  function renderDentalPage() {
    const page = document.getElementById("page-dental");
    const patient = getPatientById(state.profilePatientId) || appPatients[0];
    if (!page || !patient) {
      if (page) page.innerHTML = '<div class="empty-state" style="margin:24px">' + t("noChartYet") + "</div>";
      return;
    }
    page.innerHTML =
      '<div class="nav-header"><div class="back-btn" onclick="goBack()">' + backArrow() + "<span>" + t("back") + '</span></div><h1>' + t("chartTitle") + "</h1><p>" +
      patient.name +
      " · " +
      patient.fileNumber +
      '</p></div><div class="chart-toolbar"><strong></strong><button type="button" onclick="startNewAppointment(\'' +
      patient.id +
      "')\">" + t("bookingNew") + '</button></div><div class="dental-chart-page" id="dental-chart-inner"></div>';
    buildDentalChart("dental-chart-inner", patient.id);
  }

  function buildCalendarGrid() {
    ensureBookingDraft();
    const first = new Date(state.bookingYear, state.bookingMonth, 1);
    const daysInMonth = new Date(state.bookingYear, state.bookingMonth + 1, 0).getDate();
    const title = new Intl.DateTimeFormat(localeTag(), { month: "long", year: "numeric" }).format(first);
    let html = (isArabic() ? ["أح", "إث", "ثل", "أر", "خم", "جم", "سب"] : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]).map(function (day) { return '<div class="cal-day-lbl">' + day + "</div>"; }).join("");
    for (let index = 0; index < first.getDay(); index += 1) html += '<div class="cal-day empty"></div>';
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(state.bookingYear, state.bookingMonth, day);
      const key = toDateKey(date);
      const hasApt = appAppointments.some(function (appointment) { return appointment.date === key; });
      const selected = key === state.bookingDraft.date;
      const isToday = key === todayKey();
      html +=
        '<div class="cal-day ' +
        (selected ? "selected " : "") +
        (isToday ? "today " : "") +
        (hasApt ? "has-apt" : "") +
        '" onclick="setBookingDate(\'' +
        key +
        "')\">" +
        day +
        "</div>";
    }
    return { title, html };
  }

  function splitTimeForPicker(time) {
    const parts = String(time || "10:30").split(":").map(Number);
    const hours24 = Number.isFinite(parts[0]) ? parts[0] : 10;
    const minutes = Number.isFinite(parts[1]) ? parts[1] : 30;
    const period = hours24 >= 12 ? "PM" : "AM";
    let hour12 = hours24 % 12;
    if (hour12 === 0) hour12 = 12;
    return {
      hour: String(hour12).padStart(2, "0"),
      minute: String(minutes).padStart(2, "0"),
      period: period,
    };
  }

  function composePickerTime(hour, minute, period) {
    let hour24 = Number(hour) % 12;
    if (period === "PM") hour24 += 12;
    if (period === "AM" && Number(hour) === 12) hour24 = 0;
    return String(hour24).padStart(2, "0") + ":" + String(Number(minute)).padStart(2, "0");
  }

  function openTimePicker() {
    ensureBookingDraft();
    state.timePicker = { open: true, ...splitTimeForPicker(state.bookingDraft.time) };
    renderTimePickerOverlay();
  }

  function closeTimePicker() {
    if (state.timePicker) state.timePicker.open = false;
    const overlay = document.getElementById("time-picker-overlay");
    if (overlay) {
      overlay.classList.remove("show");
      overlay.innerHTML = "";
    }
  }

  function getTimePickerValue() {
    if (!state.timePicker) return state.bookingDraft ? state.bookingDraft.time : "10:30";
    return composePickerTime(state.timePicker.hour, state.timePicker.minute, state.timePicker.period);
  }

  function timePickerHasConflict() {
    if (!state.bookingDraft) return false;
    return hasConflict({ ...state.bookingDraft, time: getTimePickerValue(), editingId: state.bookingDraft.editingId });
  }

  function renderTimePickerColumn(id, options, selectedValue, part) {
    return (
      '<div class="time-picker-wheel">' +
      '<div class="time-picker-wheel-fade top"></div>' +
      '<div class="time-picker-wheel-highlight"></div>' +
      '<div class="time-picker-wheel-list" id="' + id + '">' +
      options.map(function (option) {
        const active = option.value === selectedValue;
        return '<button class="time-picker-option ' + (active ? "active" : "") + '" type="button" onclick="setTimePickerPart(\'' + part + '\',\'' + option.value + '\')">' + option.label + "</button>";
      }).join("") +
      "</div>" +
      '<div class="time-picker-wheel-fade bottom"></div>' +
      "</div>"
    );
  }

  function syncTimePickerColumns() {
    ["hour", "minute", "period"].forEach(function (part) {
      const list = document.getElementById("time-picker-" + part);
      const active = list && list.querySelector(".time-picker-option.active");
      if (active) active.scrollIntoView({ block: "center", inline: "nearest" });
    });
  }

  function renderTimePickerOverlay() {
    const overlay = document.getElementById("time-picker-overlay");
    if (!overlay || !state.timePicker || !state.timePicker.open) {
      if (overlay) {
        overlay.classList.remove("show");
        overlay.innerHTML = "";
      }
      return;
    }
    const value = getTimePickerValue();
    const conflict = timePickerHasConflict();
    overlay.innerHTML =
      '<div class="time-picker-backdrop" onclick="closeTimePicker()"></div>' +
      '<div class="time-picker-card">' +
        '<div class="time-picker-head"><div class="time-picker-title">' + t("timeLabel") + '</div><div class="time-picker-preview">' + formatTime(value) + "</div></div>" +
        '<div class="time-picker-columns">' +
          renderTimePickerColumn("time-picker-hour", TIME_PICKER_HOURS, state.timePicker.hour, "hour") +
          renderTimePickerColumn("time-picker-minute", TIME_PICKER_MINUTES, state.timePicker.minute, "minute") +
          renderTimePickerColumn("time-picker-period", TIME_PICKER_PERIODS, state.timePicker.period, "period") +
        "</div>" +
        '<div class="time-picker-status ' + (conflict ? "conflict" : "ok") + '">' + (conflict ? t("appointmentConflict") : formatTime(value)) + "</div>" +
        '<div class="time-picker-actions">' +
          '<button class="time-picker-btn secondary" type="button" onclick="closeTimePicker()">' + t("cancel") + '</button>' +
          '<button class="time-picker-btn primary" type="button" onclick="applyTimePicker()" ' + (conflict ? "disabled" : "") + ">" + t("confirm") + "</button>" +
        "</div>" +
      "</div>";
    overlay.classList.add("show");
    setTimeout(syncTimePickerColumns, 0);
  }

  function setTimePickerPart(part, value) {
    if (!state.timePicker) return;
    state.timePicker[part] = value;
    renderTimePickerOverlay();
  }

  function applyTimePicker() {
    if (!state.timePicker) return;
    const value = getTimePickerValue();
    if (timePickerHasConflict()) {
      showToast(t("appointmentConflict"));
      return;
    }
    closeTimePicker();
    setBookingField("time", value);
  }

  function renderTimePickerTrigger() {
    const conflict = hasConflict({ ...state.bookingDraft, time: state.bookingDraft.time, editingId: state.bookingDraft.editingId });
    return (
      '<button class="time-picker-trigger" type="button" onclick="openTimePicker()">' +
        '<span class="time-picker-trigger-copy"><strong class="time-picker-trigger-main">' + formatTime(state.bookingDraft.time) + '</strong><span class="time-picker-trigger-sub">' + (conflict ? t("appointmentConflict") : t("timeLabel")) + "</span></span>" +
        '<span class="time-picker-trigger-icon">' + icon("clock") + "</span>" +
      "</button>"
    );
  }

  function getDraftVisitType() {
    if (!state.bookingDraft) return VISIT_OPTIONS[0];
    return state.bookingDraft.visitType === "غير ذلك"
      ? state.bookingDraft.customVisitType.trim() || "غير ذلك"
      : state.bookingDraft.visitType;
  }

  function hasConflict(candidate) {
    const start = timeToMinutes(candidate.time);
    const end = start + candidate.duration;
    return appAppointments.some(function (appointment) {
      if (appointment.id === candidate.editingId || appointment.date !== candidate.date) return false;
      const existingStart = timeToMinutes(appointment.time);
      const existingEnd = appointmentEnd(appointment);
      return start < existingEnd && end > existingStart;
    });
  }

  function renderBookingPage() {
    ensureBookingDraft();
    const page = document.getElementById("page-booking");
    const patient = getPatientById(state.bookingDraft.patientId);
    const calendar = buildCalendarGrid();
    page.innerHTML =
      '<div class="nav-header"><div class="back-btn" onclick="goBack()">' + backArrow() + "<span>" + t("back") + '</span></div><h1>' +
      (state.bookingDraft.editingId ? t("bookingEdit") : t("bookingNew")) +
      "</h1><p>" +
      (state.bookingDraft.patientId === "__new__" ? t("newPatient") : patient ? patient.name : t("patientsTitle")) +
      '</p></div><div class="booking-body"><div class="booking-form">' +
      (state.bookingDraft.patientId === "__new__"
        ? '<div class="booking-helper-card"><strong>' + t("newFile") + '</strong><div class="booking-helper-note">' + t("newFileHint") + '</div></div>'
        : '<div class="booking-helper-card"><strong>' + patient.name + '</strong><div class="booking-helper-note">' + t("fileNumberLabel") + " " + patient.fileNumber + '</div></div>') +
      (state.bookingDraft.patientId === "__new__"
        ? '<div class="booking-inline"><div><div class="field-label">' + t("patientNameLabel") + '</div><input class="picker-input" value="' +
          state.bookingDraft.newPatientName +
          '" placeholder="' + t("patientNamePlaceholder") + '" oninput="setBookingField(\'newPatientName\', this.value, false)"></div><div><div class="field-label">' + t("phoneLabel") + '</div><input class="picker-input" value="' +
          state.bookingDraft.newPatientPhone +
          '" placeholder="05X XXX XXXX" oninput="setBookingField(\'newPatientPhone\', this.value, false)"></div></div>' +
          '<div><div class="field-label">' + t("fileNumberLabel") + '</div><input class="picker-input" value="' +
          state.bookingDraft.newPatientFileNumber +
          '" oninput="setBookingField(\'newPatientFileNumber\', this.value, false)"></div>'
        : "") +
      '<div><div class="field-label">' + t("visitTypeLabel") + '</div><select class="picker-select" onchange="setBookingField(\'visitType\', this.value)">' +
      VISIT_OPTIONS.map(function (option) {
        return '<option value="' + option + '" ' + (state.bookingDraft.visitType === option ? "selected" : "") + ">" + displayVisitType(option) + "</option>";
      }).join("") +
      (state.bookingDraft.visitType === "غير ذلك"
        ? '</select></div><div><div class="field-label">' + t("customVisitTypeLabel") + '</div><input class="picker-input" value="' +
          state.bookingDraft.customVisitType +
          '" placeholder="' + t("customVisitTypePlaceholder") + '" oninput="setBookingField(\'customVisitType\', this.value, false)"></div>'
        : "</select></div>") +
      '<div><div class="field-label">' + t("dateLabel") + '</div><div class="cal-header"><button class="cal-nav" type="button" aria-label="' + t("previousMonth") + '" onclick="changeBookingMonth(-1)">' + navArrow("prev") + '</button><span class="cal-title">' +
      calendar.title +
      '</span><button class="cal-nav" type="button" aria-label="' + t("nextMonth") + '" onclick="changeBookingMonth(1)">' + navArrow("next") + '</button></div><div class="cal-grid">' +
      calendar.html +
      "</div></div>" +
      '<div><div class="field-label">' + t("timeLabel") + "</div>" +
      renderTimePickerTrigger() +
      '</div><div><div class="field-label">' + t("notesLabel") + '</div><textarea class="picker-textarea" oninput="setBookingField(\'notes\', this.value, false)" placeholder="' + t("notesPlaceholder") + '">' +
      state.bookingDraft.notes +
      '</textarea></div></div></div><div class="booking-footer"><button class="btn-primary" type="button" onclick="saveBooking()">' +
      (state.bookingDraft.editingId ? t("saveEdit") : t("confirmBooking")) +
      "</button></div>";
    renderTimePickerOverlay();
  }

  function buildUpperPositions() {
    const ids = ["UR8", "UR7", "UR6", "UR5", "UR4", "UR3", "UR2", "UR1", "UL1", "UL2", "UL3", "UL4", "UL5", "UL6", "UL7", "UL8"];
    const nums = [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8];
    const types = ["W", "M", "M", "P", "P", "C", "I", "I", "I", "I", "C", "P", "P", "M", "M", "W"];
    const xs = [28, 49, 71, 95, 118, 141, 160, 176, 190, 206, 225, 248, 271, 295, 317, 338];
    return xs.map(function (x, index) {
      const dist = Math.abs(x - 183);
      const y = Math.pow(dist / 84, 1.26) * 28;
      return { id: ids[index], n: nums[index], t: types[index], cx: x, cy: y };
    });
  }

  function buildLowerPositions() {
    const ids = ["LR8", "LR7", "LR6", "LR5", "LR4", "LR3", "LR2", "LR1", "LL1", "LL2", "LL3", "LL4", "LL5", "LL6", "LL7", "LL8"];
    const nums = [8, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 8];
    const types = ["W", "M", "M", "P", "P", "C", "I", "I", "I", "I", "C", "P", "P", "M", "M", "W"];
    const xs = [28, 49, 71, 95, 118, 141, 160, 176, 190, 206, 225, 248, 271, 295, 317, 338];
    return xs.map(function (x, index) {
      const dist = Math.abs(x - 183);
      const y = Math.pow(dist / 84, 1.26) * 28;
      return { id: ids[index], n: nums[index], t: types[index], cx: x, cy: y };
    });
  }

  function rootsCount(type) {
    return type === "M" ? 3 : type === "W" ? 2 : 1;
  }

  function getToothState(patient, toothId) {
    return patient.toothStates[toothId] || "healthy";
  }

  function drawArch(svg, jaw, teeth, patient) {
    const arch = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arch.setAttribute("d", jaw === "U" ? "M 8,78 Q 30,10 183,4 Q 336,10 358,78" : "M 8,8 Q 30,76 183,82 Q 336,76 358,8");
    arch.setAttribute("fill", "none");
    arch.setAttribute("stroke", "#f5e6e0");
    arch.setAttribute("stroke-width", "18");
    arch.setAttribute("stroke-linecap", "round");
    svg.appendChild(arch);
    teeth.forEach(function (tooth) {
      drawTooth(svg, tooth, jaw, patient);
    });
  }

  function getCrownPath(tooth, jaw, tx, ty, d) {
    if (tooth.t === "I") {
      return jaw === "U"
        ? "M" + (tx + 2) + "," + (ty + d.ch - 1) +
            " L" + (tx + 1) + "," + (ty + 4) +
            " Q" + (tx + d.cw / 2) + "," + (ty - 1) + " " + (tx + d.cw - 1) + "," + (ty + 4) +
            " L" + (tx + d.cw - 2) + "," + (ty + d.ch - 2) +
            " Q" + (tx + d.cw / 2 + 3) + "," + (ty + d.ch + 2) + " " + (tx + d.cw / 2) + "," + (ty + d.ch + 2) +
            " Q" + (tx + d.cw / 2 - 3) + "," + (ty + d.ch + 2) + " " + (tx + 2) + "," + (ty + d.ch - 1) + "Z"
        : "M" + (tx + 2) + "," + (ty + 1) +
            " Q" + (tx + d.cw / 2 - 2) + "," + (ty - 2) + " " + (tx + d.cw / 2) + "," + (ty - 2) +
            " Q" + (tx + d.cw / 2 + 2) + "," + (ty - 2) + " " + (tx + d.cw - 2) + "," + (ty + 1) +
            " L" + (tx + d.cw - 1) + "," + (ty + d.ch - 4) +
            " Q" + (tx + d.cw / 2) + "," + (ty + d.ch + 1) + " " + (tx + 1) + "," + (ty + d.ch - 4) + "Z";
    }

    if (tooth.t === "C") {
      return jaw === "U"
        ? "M" + (tx + 1) + "," + (ty + d.ch - 2) +
            " L" + (tx + 1) + "," + (ty + 6) +
            " Q" + (tx + d.cw / 2 - 1) + "," + (ty + 1) + " " + (tx + d.cw / 2) + "," + ty +
            " Q" + (tx + d.cw / 2 + 1) + "," + (ty + 1) + " " + (tx + d.cw - 1) + "," + (ty + 6) +
            " L" + (tx + d.cw - 1) + "," + (ty + d.ch - 2) +
            " Q" + (tx + d.cw / 2) + "," + (ty + d.ch + 2) + " " + (tx + 1) + "," + (ty + d.ch - 2) + "Z"
        : "M" + (tx + 1) + "," + (ty + 2) +
            " Q" + (tx + d.cw / 2) + "," + (ty - 2) + " " + (tx + d.cw - 1) + "," + (ty + 2) +
            " L" + (tx + d.cw - 1) + "," + (ty + d.ch - 6) +
            " Q" + (tx + d.cw / 2 + 1) + "," + (ty + d.ch - 1) + " " + (tx + d.cw / 2) + "," + (ty + d.ch) +
            " Q" + (tx + d.cw / 2 - 1) + "," + (ty + d.ch - 1) + " " + (tx + 1) + "," + (ty + d.ch - 6) + "Z";
    }

    if (tooth.t === "P") {
      return jaw === "U"
        ? "M" + (tx + 1) + "," + (ty + d.ch - 1) +
            " L" + (tx + 1) + "," + (ty + 5) +
            " Q" + (tx + d.cw * 0.34) + "," + (ty + 1) + " " + (tx + d.cw * 0.45) + "," + (ty + 4) +
            " Q" + (tx + d.cw / 2) + "," + (ty + 6) + " " + (tx + d.cw * 0.55) + "," + (ty + 4) +
            " Q" + (tx + d.cw * 0.66) + "," + (ty + 1) + " " + (tx + d.cw - 1) + "," + (ty + 5) +
            " L" + (tx + d.cw - 1) + "," + (ty + d.ch - 1) +
            " Q" + (tx + d.cw / 2) + "," + (ty + d.ch + 2) + " " + (tx + 1) + "," + (ty + d.ch - 1) + "Z"
        : "M" + (tx + 1) + "," + (ty + 1) +
            " Q" + (tx + d.cw * 0.34) + "," + (ty - 1) + " " + (tx + d.cw * 0.45) + "," + (ty + 2) +
            " Q" + (tx + d.cw / 2) + "," + (ty + 4) + " " + (tx + d.cw * 0.55) + "," + (ty + 2) +
            " Q" + (tx + d.cw * 0.66) + "," + (ty - 1) + " " + (tx + d.cw - 1) + "," + (ty + 1) +
            " L" + (tx + d.cw - 1) + "," + (ty + d.ch - 5) +
            " Q" + (tx + d.cw / 2) + "," + (ty + d.ch + 1) + " " + (tx + 1) + "," + (ty + d.ch - 5) + "Z";
    }

    return jaw === "U"
      ? "M" + tx + "," + (ty + d.ch) + " L" + tx + "," + (ty + 3) + " Q" + tx + "," + ty + " " + (tx + 3) + "," + ty + " L" + (tx + d.cw - 3) + "," + ty + " Q" + (tx + d.cw) + "," + ty + " " + (tx + d.cw) + "," + (ty + 3) + " L" + (tx + d.cw) + "," + (ty + d.ch) + " Q" + (tx + d.cw / 2 + 3) + "," + (ty + d.ch + 5) + " " + (tx + d.cw / 2) + "," + (ty + d.ch + 5) + " Q" + (tx + d.cw / 2 - 3) + "," + (ty + d.ch + 5) + " " + tx + "," + (ty + d.ch) + "Z"
      : "M" + tx + "," + ty + " L" + tx + "," + (ty + d.ch - 3) + " Q" + tx + "," + (ty + d.ch) + " " + (tx + 3) + "," + (ty + d.ch) + " L" + (tx + d.cw - 3) + "," + (ty + d.ch) + " Q" + (tx + d.cw) + "," + (ty + d.ch) + " " + (tx + d.cw) + "," + (ty + d.ch - 3) + " L" + (tx + d.cw) + "," + ty + " Q" + (tx + d.cw / 2 + 3) + "," + (ty - 5) + " " + (tx + d.cw / 2) + "," + (ty - 5) + " Q" + (tx + d.cw / 2 - 3) + "," + (ty - 5) + " " + tx + "," + ty + "Z";
  }

  function drawTooth(svg, tooth, jaw, patient) {
    const stateId = getToothState(patient, tooth.id);
    const condition = ACTION_MAP[stateId] || { fill: "#f0ede8", stroke: "#c5bfb5", root: "#e2ddd5", text: "#888" };
    const dimensions = TD[tooth.t];
    const tx = tooth.cx - dimensions.cw / 2;
    const ty = jaw === "U" ? tooth.cy + 12 : 86 - (tooth.cy + 12) - dimensions.ch;
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.style.cursor = "pointer";
    const hitArea = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    hitArea.setAttribute("x", tx - 8);
    hitArea.setAttribute("y", jaw === "U" ? ty - dimensions.rh - 6 : ty - 6);
    hitArea.setAttribute("width", dimensions.cw + 16);
    hitArea.setAttribute("height", dimensions.ch + dimensions.rh + 14);
    hitArea.setAttribute("rx", "8");
    hitArea.setAttribute("fill", "transparent");
    hitArea.setAttribute("pointer-events", "all");
    group.appendChild(hitArea);
    const roots = rootsCount(tooth.t);
    const rootWidth = Math.max(4, dimensions.cw / roots - 1.5);
    const gap = roots > 1 ? (dimensions.cw - rootWidth * roots) / (roots - 1) : 0;

    for (let index = 0; index < roots; index += 1) {
      const rootX = tx + index * (rootWidth + gap);
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        jaw === "U"
          ? "M" + rootX + "," + ty + " L" + rootX + "," + (ty - dimensions.rh) + " Q" + (rootX + rootWidth / 2) + "," + (ty - dimensions.rh - 4) + " " + (rootX + rootWidth) + "," + (ty - dimensions.rh) + " L" + (rootX + rootWidth) + "," + ty + "Z"
          : "M" + rootX + "," + (ty + dimensions.ch) + " L" + rootX + "," + (ty + dimensions.ch + dimensions.rh) + " Q" + (rootX + rootWidth / 2) + "," + (ty + dimensions.ch + dimensions.rh + 4) + " " + (rootX + rootWidth) + "," + (ty + dimensions.ch + dimensions.rh) + " L" + (rootX + rootWidth) + "," + (ty + dimensions.ch) + "Z"
      );
      path.setAttribute("fill", condition.root);
      path.setAttribute("stroke", condition.stroke);
      path.setAttribute("stroke-width", "0.7");
      group.appendChild(path);
    }

    const crown = document.createElementNS("http://www.w3.org/2000/svg", "path");
    crown.setAttribute("d", getCrownPath(tooth, jaw, tx, ty, dimensions));
    crown.setAttribute("fill", condition.fill);
    crown.setAttribute("stroke", condition.stroke);
    crown.setAttribute("stroke-width", stateId === "missing" ? "0.9" : "0.7");
    if (stateId === "missing") crown.setAttribute("stroke-dasharray", "2.5,1.5");
    group.appendChild(crown);

    if (stateId === "missing") {
      [
        [tx + 2, ty + 3, tx + dimensions.cw - 2, ty + dimensions.ch - 3],
        [tx + dimensions.cw - 2, ty + 3, tx + 2, ty + dimensions.ch - 3],
      ].forEach(function (coords) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", coords[0]);
        line.setAttribute("y1", coords[1]);
        line.setAttribute("x2", coords[2]);
        line.setAttribute("y2", coords[3]);
        line.setAttribute("stroke", "#E24B4A");
        line.setAttribute("stroke-width", "0.9");
        group.appendChild(line);
      });
    }

    if (selectedToothId === tooth.id) {
      const highlight = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      highlight.setAttribute("x", tx - 2);
      highlight.setAttribute("y", ty - 2);
      highlight.setAttribute("width", dimensions.cw + 4);
      highlight.setAttribute("height", dimensions.ch + 4);
      highlight.setAttribute("rx", "3");
      highlight.setAttribute("fill", "none");
      highlight.setAttribute("stroke", "#1a4a7a");
      highlight.setAttribute("stroke-width", "1.5");
      group.insertBefore(highlight, group.firstChild);
    }

    const number = document.createElementNS("http://www.w3.org/2000/svg", "text");
    number.setAttribute("x", tx + dimensions.cw / 2);
    number.setAttribute("y", jaw === "U" ? ty + dimensions.ch + 14 : ty - 5);
    number.setAttribute("text-anchor", "middle");
    number.setAttribute("font-size", "8");
    number.setAttribute("fill", "#bbb");
    number.setAttribute("font-family", "Cairo,sans-serif");
    number.textContent = tooth.n;
    group.appendChild(number);

    group.addEventListener("click", function (event) {
      event.stopPropagation();
      openToothMenu(patient.id, tooth);
    });
    svg.appendChild(group);
  }

  function renderJaw(teeth, jaw, parent, containerId, patient) {
    const wrap = document.createElement("div");
    wrap.className = "jaw-arch-wrap";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("viewBox", "0 0 366 86");
    svg.id = "jaw-svg-" + jaw + "-" + containerId;

    const arch = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arch.setAttribute("d", jaw === "U" ? "M 8,78 Q 30,10 183,4 Q 336,10 358,78" : "M 8,8 Q 30,76 183,82 Q 336,76 358,8");
    arch.setAttribute("fill", "none");
    arch.setAttribute("stroke", "#f5e6e0");
    arch.setAttribute("stroke-width", "18");
    arch.setAttribute("stroke-linecap", "round");
    svg.appendChild(arch);

    const midline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    midline.setAttribute("x1", "183");
    midline.setAttribute("y1", "0");
    midline.setAttribute("x2", "183");
    midline.setAttribute("y2", "86");
    midline.setAttribute("stroke", "#e0e0e0");
    midline.setAttribute("stroke-width", "0.8");
    midline.setAttribute("stroke-dasharray", "3,3");
    svg.appendChild(midline);

    teeth.forEach(function (tooth) {
      drawTooth(svg, tooth, jaw, patient);
    });

    wrap.appendChild(svg);
    parent.appendChild(wrap);
  }

  function updateDentalStats(containerId, patient) {
    const allTeeth = buildUpperPositions().concat(buildLowerPositions());
    const counts = { healthy: 0, filling: 0, crown: 0, missing: 0, other: 0 };
    allTeeth.forEach(function (tooth) {
      const stateId = getToothState(patient, tooth.id);
      if (stateId === "healthy") counts.healthy += 1;
      else if (stateId === "filling") counts.filling += 1;
      else if (stateId === "crown") counts.crown += 1;
      else if (stateId === "missing") counts.missing += 1;
      else counts.other += 1;
    });
    [["ds-h-", counts.healthy], ["ds-f-", counts.filling], ["ds-c-", counts.crown], ["ds-m-", counts.missing], ["ds-k-", counts.other]].forEach(function (entry) {
      const element = document.getElementById(entry[0] + containerId);
      if (element) element.textContent = entry[1];
    });
  }

  function renderToothInfoBar(containerId, patient) {
    const groupedEntries = Object.keys(patient.toothHistory || {})
      .map(function (toothId) {
        return {
          toothId: toothId,
          tooth: findToothById(toothId),
          entries: getToothHistory(patient, toothId),
        };
      })
      .filter(function (group) { return group.entries.length; })
      .sort(function (left, right) {
        return (right.entries[0].createdAt || 0) - (left.entries[0].createdAt || 0);
      });
    const infoBar = document.createElement("div");
    infoBar.className = "tooth-info-bar";
    infoBar.id = "tooth-infobar-" + containerId;
    infoBar.innerHTML =
      '<div class="tib-icon" style="background:#f5f6f8" id="tib-icon-' + containerId + '">' + icon("tooth") + '</div>' +
      '<div class="tib-texts"><div class="tib-name" id="tib-name-' + containerId + '"></div>' +
      '<div class="tib-state" id="tib-state-' + containerId + '">' + (groupedEntries.length ? t("toothRecord") : t("noToothRecord")) + '</div>' +
      (groupedEntries.length
        ? '<div class="tooth-log-groups">' + groupedEntries.map(function (group) {
            const toothTitle = (isArabic() ? "السن " : "Tooth ") + (group.tooth ? group.tooth.n : group.toothId);
            const toothMeta = (group.tooth ? displayToothType(group.tooth.t) : "") + (group.tooth ? " · " : "") + displayToothSide(group.toothId.slice(0,2));
            return '<div class="tooth-log-group ' + (selectedToothId === group.toothId ? 'active' : '') + '">' +
              '<button class="tooth-log-group-head" type="button" onclick="focusToothRecord(\'' + patient.id + '\',\'' + group.toothId + '\')"><strong>' + toothTitle + '</strong><span>' + toothMeta + '</span><small class="tooth-log-count">' + group.entries.length + '</small></button>' +
              '<div class="tooth-log-entry-list">' +
              group.entries.map(function (entry) {
                return '<button class="tooth-log-entry ' + (selectedToothId === group.toothId ? 'active' : '') + '" type="button" onclick="focusToothRecord(\'' + patient.id + '\',\'' + group.toothId + '\')"><div class="tooth-log-entry-main"><strong>' + getToothEntryLabel(entry) + '</strong><span>' + formatEntryDate(entry.date) + '</span></div></button>';
              }).join("") +
              '</div></div>';
          }).join("") + '</div>'
        : "") +
      '</div>';
    return infoBar;
  }

  function buildDentalChart(containerId, patientId) {
    const container = document.getElementById(containerId);
    const patient = getPatientById(patientId);
    if (!container || !patient) return;
    currentChartContainer = containerId;
    container.innerHTML = "";

    const statsRow = document.createElement("div");
    statsRow.className = "dental-stats-row";
    statsRow.id = "dstats-" + containerId;
    statsRow.innerHTML =
      '<div class="d-stat"><div class="d-stat-n" id="ds-h-' + containerId + '">-</div><div class="d-stat-l">' + t("chartHealthy") + '</div></div>' +
      '<div class="d-stat"><div class="d-stat-n" style="color:#185FA5" id="ds-f-' + containerId + '">-</div><div class="d-stat-l">' + t("chartFilling") + '</div></div>' +
      '<div class="d-stat"><div class="d-stat-n" style="color:#BA7517" id="ds-c-' + containerId + '">-</div><div class="d-stat-l">' + t("chartCrown") + '</div></div>' +
      '<div class="d-stat"><div class="d-stat-n" style="color:#E24B4A" id="ds-m-' + containerId + '">-</div><div class="d-stat-l">' + t("chartMissing") + '</div></div>' +
      '<div class="d-stat"><div class="d-stat-n" style="color:#534AB7" id="ds-k-' + containerId + '">-</div><div class="d-stat-l">' + t("chartTreatment") + '</div></div>';
    container.appendChild(statsRow);

    const chartArea = document.createElement("div");
    chartArea.className = "chart-container";
    chartArea.id = "chart-area-" + containerId;
    container.appendChild(chartArea);

    renderJaw(buildUpperPositions(), "U", chartArea, containerId, patient);

    const divider = document.createElement("div");
    divider.className = "gum-divider";
    divider.innerHTML = '<div class="gum-line"></div><div class="gum-line"></div>';
    chartArea.appendChild(divider);

    renderJaw(buildLowerPositions(), "L", chartArea, containerId, patient);
    container.appendChild(renderToothInfoBar(containerId, patient));

    updateDentalStats(containerId, patient);
  }
  function getToothHistory(patient, toothId) {
    patient.toothHistory[toothId] = patient.toothHistory[toothId] || [];
    return patient.toothHistory[toothId];
  }

  function openToothMenu(patientId, tooth) {
    state.toothMenu = { patientId, tooth };
    selectedToothId = tooth.id;
    renderVisibleCharts();
    renderToothMenu();
    document.getElementById("tooth-menu-overlay").classList.add("show");
  }

  function focusToothRecord(patientId, toothId) {
    const tooth = findToothById(toothId);
    if (!tooth) return;
    const activeContainerId =
      state.currentPage === "page-profile" && state.profileTab === "chart"
        ? "tab-chart"
        : state.currentPage === "page-dental"
          ? "dental-chart-inner"
          : null;
    const infoBar = activeContainerId ? document.getElementById("tooth-infobar-" + activeContainerId) : null;
    const chartArea = activeContainerId ? document.getElementById("chart-area-" + activeContainerId) : null;
    const infoBarTop = infoBar ? infoBar.scrollTop : 0;
    const chartTop = chartArea ? chartArea.scrollTop : 0;
    state.profilePatientId = patientId;
    selectedToothId = toothId;
    state.toothMenu = { patientId: patientId, tooth: tooth };
    if (state.currentPage === "page-profile") {
      state.profileTab = "chart";
      renderProfilePage();
      const nextInfoBar = document.getElementById("tooth-infobar-tab-chart");
      const nextChartArea = document.getElementById("chart-area-tab-chart");
      if (nextChartArea) nextChartArea.scrollTop = chartTop;
      if (nextInfoBar) nextInfoBar.scrollTop = infoBarTop;
      return;
    }
    if (state.currentPage === "page-dental") {
      renderDentalPage();
      const nextInfoBar = document.getElementById("tooth-infobar-dental-chart-inner");
      const nextChartArea = document.getElementById("chart-area-dental-chart-inner");
      if (nextChartArea) nextChartArea.scrollTop = chartTop;
      if (nextInfoBar) nextInfoBar.scrollTop = infoBarTop;
      return;
    }
    state.profileTab = "chart";
    renderProfilePage();
    const nextInfoBar = document.getElementById("tooth-infobar-tab-chart");
    const nextChartArea = document.getElementById("chart-area-tab-chart");
    if (nextChartArea) nextChartArea.scrollTop = chartTop;
    if (nextInfoBar) nextInfoBar.scrollTop = infoBarTop;
  }
  function closeToothMenu() {
    const overlay = document.getElementById("tooth-menu-overlay");
    if (overlay) overlay.classList.remove("show");
  }

  function renderToothMenu() {
    if (!state.toothMenu) return;
    const patient = getPatientById(state.toothMenu.patientId);
    const history = getToothHistory(patient, state.toothMenu.tooth.id);
    const current = getToothState(patient, state.toothMenu.tooth.id);
    document.getElementById("tmenu-title").textContent = (isArabic() ? "السن " : "Tooth ") + state.toothMenu.tooth.n + " · " + displayToothType(state.toothMenu.tooth.t);
    document.getElementById("tmenu-loc").textContent = displayToothSide(state.toothMenu.tooth.id.slice(0, 2));
    document.getElementById("tmenu-items").innerHTML = `
      <div class="tooth-menu-body">
        <div class="tooth-menu-section">
          <div class="tooth-menu-section-title">${t("toothRecord")}</div>
          ${
            history.length
              ? `<div class="tooth-history-list">
                  ${history
                    .map(function (entry) {
                      return `
                        <div class="tooth-history-row">
                          <div>
                            <strong>${getToothEntryLabel(entry)}</strong>
                            <span>${formatEntryDate(entry.date)}</span>
                          </div>
                          <button class="tooth-history-delete" type="button" onclick="deleteToothEntry('${patient.id}','${state.toothMenu.tooth.id}','${entry.id}')">×</button>
                        </div>
                      `;
                    })
                    .join("")}
                </div>`
              : '<div class="empty-state" style="padding:14px 10px;font-size:12px">' + t("noToothRecord") + '</div>'
          }
        </div>
        <div class="tooth-menu-section">
          <div class="tooth-menu-section-title">${t("chooseNewAction")}</div>
          <div class="tooth-actions-grid">
            ${ACTIONS.map(function (action) {
              return `
                <button class="tooth-action-chip ${current === action.id ? "active" : ""}" type="button" onclick="saveToothAction('${patient.id}','${state.toothMenu.tooth.id}','${action.id}')">
                  ${actionIcon(action)}
                  <strong>${displayActionName(action.id)}</strong>
                </button>
              `;
            }).join("")}
            <div class="tooth-action-chip tooth-action-chip-input">
              <input id="tooth-custom-action-input" class="tooth-action-inline-input" type="text" value="${current === "custom" && history[0] && history[0].label ? history[0].label : ""}" placeholder="${t("otherAction")}" onclick="event.stopPropagation()" onfocus="event.stopPropagation()">
              <button class="tooth-inline-save" type="button" onclick="event.stopPropagation(); saveCustomToothAction('${patient.id}','${state.toothMenu.tooth.id}')">${icon("plus")}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderVisibleCharts() {
    if (state.currentPage === "page-profile" && state.profileTab === "chart") buildDentalChart("tab-chart", state.profilePatientId);
    if (state.currentPage === "page-dental") buildDentalChart("dental-chart-inner", state.profilePatientId);
  }

  function saveToothAction(patientId, toothId, actionId) {
    const patient = getPatientById(patientId);
    patient.toothStates[toothId] = actionId;
    getToothHistory(patient, toothId).unshift({
      id: uid("th"),
      stateId: actionId,
      createdAt: Date.now(),
      date: new Intl.DateTimeFormat(localeTag(), { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date()),
    });
    persistData();
    renderVisibleCharts();
    closeToothMenu();
    showToast(t("actionSavedPrefix") + " " + displayActionName(actionId) + " " + t("actionSavedSuffix"));
  }

  function saveCustomToothAction(patientId, toothId) {
    const input = document.getElementById("tooth-custom-action-input");
    const label = input ? input.value.trim() : "";
    if (!label) {
      showToast(t("writeActionFirst"));
      return;
    }
    const patient = getPatientById(patientId);
    patient.toothStates[toothId] = "custom";
    getToothHistory(patient, toothId).unshift({
      id: uid("th"),
      stateId: "custom",
      label: label,
      createdAt: Date.now(),
      date: new Intl.DateTimeFormat(localeTag(), { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date()),
    });
    persistData();
    renderVisibleCharts();
    closeToothMenu();
    showToast(t("customActionSaved"));
  }

  function deleteToothEntry(patientId, toothId, entryId) {
    const patient = getPatientById(patientId);
    openConfirmDialog({
      title: t("deleteToothRecordTitle"),
      message: t("deleteToothRecordMessage"),
      confirmText: t("deleteToothRecordButton"),
      onConfirm: function () {
        patient.toothHistory[toothId] = getToothHistory(patient, toothId).filter(function (entry) {
          return entry.id !== entryId;
        });
        const latest = patient.toothHistory[toothId][0];
        if (latest) patient.toothStates[toothId] = latest.stateId;
        else delete patient.toothStates[toothId];
        persistData();
        renderVisibleCharts();
        renderToothMenu();
        showToast(t("toothRecordDeleted"));
      },
    });
  }

  function setSelectedDate(dateKey) {
    state.selectedDate = dateKey;
    renderAppointmentsPage();
  }

  function shiftSelectedDate(offsetDays) {
    state.selectedDate = toDateKey(addDays(new Date(state.selectedDate + "T12:00:00"), offsetDays));
    renderAppointmentsPage();
  }

  function updatePatientFilter(field, value) {
    state.patientFilters[field] = value;
    renderPatientsList();
  }

  function openPatientProfile(patientId) {
    state.profilePatientId = patientId;
    state.profileTab = "info";
    goTo("page-profile");
  }

  function setProfileTab(tab) {
    if (tab === "account") tab = "info";
    state.profileTab = tab;
    renderProfilePage();
  }

  function openDentalPage() {
    goTo("page-dental");
  }

  function startNewAppointment(patientId) {
    state.settingsOpen = false;
    state.bookingDraft = {
      editingId: null,
      patientId: patientId || "__new__",
      date: state.selectedDate,
      time: "10:30",
      duration: 30,
      visitType: VISIT_OPTIONS[0],
      customVisitType: "",
      notes: "",
      price: 200,
      newPatientName: "",
      newPatientPhone: "",
      newPatientFileNumber: nextPatientFileNumber(),
    };
    goTo("page-booking");
  }

  function startEditAppointment(appointmentId) {
    const appointment = appAppointments.find(function (item) { return item.id === appointmentId; });
    if (!appointment) return;
    state.bookingDraft = {
      editingId: appointment.id,
      patientId: appointment.patientId,
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration,
      visitType: VISIT_OPTIONS.includes(appointment.visitType) ? appointment.visitType : "غير ذلك",
      customVisitType: VISIT_OPTIONS.includes(appointment.visitType) ? "" : appointment.visitType,
      notes: appointment.notes || "",
      price: appointment.price || 0,
      newPatientName: "",
      newPatientPhone: "",
      newPatientFileNumber: "",
    };
    goTo("page-booking");
  }

  function deleteAppointment(appointmentId) {
    openConfirmDialog({
      title: t("delete"),
      message: t("appointmentDeleted"),
      confirmText: t("delete"),
      onConfirm: function () {
        appAppointments = appAppointments.filter(function (appointment) { return appointment.id !== appointmentId; });
        persistData();
        refreshPages();
        showToast(t("appointmentDeleted"));
      },
    });
  }

  function setBookingField(field, value, rerender) {
    ensureBookingDraft();
    state.bookingDraft[field] = value;
    if (field === "date") {
      const date = new Date(value + "T12:00:00");
      state.bookingMonth = date.getMonth();
      state.bookingYear = date.getFullYear();
    }
    if (rerender !== false) renderBookingPage();
  }

  function setBookingDate(dateKey) {
    setBookingField("date", dateKey);
  }

  function changeBookingMonth(offset) {
    state.bookingMonth += offset;
    if (state.bookingMonth < 0) {
      state.bookingMonth = 11;
      state.bookingYear -= 1;
    }
    if (state.bookingMonth > 11) {
      state.bookingMonth = 0;
      state.bookingYear += 1;
    }
    renderBookingPage();
  }

  function createPatientFromDraft() {
    const name = (state.bookingDraft.newPatientName || "").trim();
    const phone = (state.bookingDraft.newPatientPhone || "").trim();
    if (!name) {
      showToast(t("patientNameRequired"));
      return null;
    }
    const palette = PATIENT_PALETTE[appPatients.length % PATIENT_PALETTE.length];
    const patient = normalizePatient({
      id: uid("pt"),
      name: name,
      phone: phone,
      fileNumber: (state.bookingDraft.newPatientFileNumber || nextPatientFileNumber()).trim(),
      recordNumber: (state.bookingDraft.newPatientFileNumber || nextPatientFileNumber()).trim(),
      age: "--",
      gender: "غير محدد",
      joinDate: new Intl.DateTimeFormat(localeTag(), { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()),
      color: palette.color,
      bg: palette.bg,
      status: "جديد",
      photos: [],
      toothStates: {},
      toothHistory: {},
    }, appPatients.length);
    appPatients.unshift(patient);
    return patient;
  }

  function saveBooking() {
    ensureBookingDraft();
    const visitType = getDraftVisitType();
    if (!state.bookingDraft.patientId || !visitType || !state.bookingDraft.date || !state.bookingDraft.time) {
      showToast(t("bookingMissing"));
      return;
    }
    const candidate = {
      editingId: state.bookingDraft.editingId,
      date: state.bookingDraft.date,
      time: state.bookingDraft.time,
      duration: Number(state.bookingDraft.duration),
    };
    if (hasConflict(candidate)) {
      showToast(t("appointmentConflict"));
      return;
    }
    let patientId = state.bookingDraft.patientId;
    if (patientId === "__new__") {
      const createdPatient = createPatientFromDraft();
      if (!createdPatient) return;
      patientId = createdPatient.id;
    }
    const payload = {
      id: state.bookingDraft.editingId || uid("apt"),
      patientId: patientId,
      date: state.bookingDraft.date,
      time: state.bookingDraft.time,
      duration: Number(state.bookingDraft.duration),
      visitType: visitType,
      notes: state.bookingDraft.notes,
      price: Number(state.bookingDraft.price) || 0,
      paidAmount: state.bookingDraft.editingId
        ? getDisplayPaidAmount((appAppointments.find(function (item) { return item.id === state.bookingDraft.editingId; }) || { paidAmount: 0 }))
        : 0,
    };
    if (state.bookingDraft.editingId) {
      appAppointments = appAppointments.map(function (appointment) { return appointment.id === payload.id ? payload : appointment; });
      showToast(t("appointmentUpdated"));
    } else {
      appAppointments.push(payload);
      showToast(t("appointmentBooked"));
    }
    persistData();
    state.selectedDate = payload.date;
    state.profilePatientId = payload.patientId;
    state.bookingDraft = null;
    navTo("page-appointments");
    refreshPages();
  }

  function addPhoto(event, patientId) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      const patient = getPatientById(patientId);
      patient.photos.unshift({
        id: uid("photo"),
        title: file.name.replace(/\.[^.]+$/, "") || t("addPhoto"),
        date: new Intl.DateTimeFormat(localeTag(), { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()),
        src: reader.result,
      });
      persistData();
      state.profileTab = "photos";
      renderProfilePage();
      showToast(t("photoAdded"));
    });
    reader.readAsDataURL(file);
  }

  function openViewer(photoId) {
    const patient = getPatientById(state.profilePatientId);
    const photo = patient && patient.photos.find(function (item) { return item.id === photoId; });
    if (!photo) return;
    document.getElementById("viewer-image").src = photo.src;
    document.getElementById("viewer-title").textContent = photo.title;
    document.getElementById("viewer-date").textContent = photo.date;
    document.getElementById("viewer-overlay").classList.add("show");
  }

  function closeViewer() {
    const overlay = document.getElementById("viewer-overlay");
    if (overlay) overlay.classList.remove("show");
  }

  function deletePhoto(patientId, photoId) {
    const patient = getPatientById(patientId);
    openConfirmDialog({
      title: t("delete"),
      message: t("photoDeleted"),
      confirmText: t("delete"),
      onConfirm: function () {
        patient.photos = patient.photos.filter(function (photo) { return photo.id !== photoId; });
        persistData();
        renderProfilePage();
        closeViewer();
        showToast(t("photoDeleted"));
      },
    });
  }

  function showPage() {
    document.querySelectorAll(".page").forEach(function (page) {
      page.classList.remove("active");
      page.style.display = "none";
    });
    const page = document.getElementById(state.currentPage);
    if (page) {
      page.classList.add("active");
      page.style.display = "flex";
    }
  }

  function toggleSettingsMenu(event) {
    if (event) event.stopPropagation();
    state.settingsOpen = !state.settingsOpen;
    renderHomePage();
    showPage();
  }

  function closeSettingsMenu() {
    if (!state.settingsOpen) return;
    state.settingsOpen = false;
    if (state.currentPage === "page-home") {
      renderHomePage();
      showPage();
    }
  }

  function setLanguage(languageId) {
    if (!LANGUAGE_OPTIONS.includes(languageId)) return;
    state.language = languageId;
    state.settingsOpen = false;
    persistData();
    applyLanguageDirection();
    refreshPages();
  }

  function refreshPages() {
    applyLanguageDirection();
    renderHomePage();
    renderAppointmentsPage();
    renderPatientsPage();
    renderProfilePage();
    renderDentalPage();
    if (state.currentPage === "page-booking") renderBookingPage();
    else closeTimePicker();
    showPage();
  }

  function goTo(pageId) {
    state.pageHistory.push(pageId);
    state.currentPage = pageId;
    state.settingsOpen = false;
    if (pageId !== "page-booking") closeTimePicker();
    if (pageId === "page-booking") ensureBookingDraft(state.profilePatientId);
    if (pageId === "page-profile") renderProfilePage();
    if (pageId === "page-dental") renderDentalPage();
    if (pageId === "page-booking") renderBookingPage();
    showPage();
  }

  function navTo(pageId) {
    state.pageHistory = [pageId];
    state.currentPage = pageId;
    state.settingsOpen = false;
    if (pageId !== "page-booking") closeTimePicker();
    if (pageId === "page-booking") ensureBookingDraft(state.profilePatientId);
    refreshPages();
  }

  function goBack() {
    if (state.pageHistory.length <= 1) return;
    state.pageHistory.pop();
    state.currentPage = state.pageHistory[state.pageHistory.length - 1];
    state.settingsOpen = false;
    if (state.currentPage !== "page-booking") closeTimePicker();
    if (state.currentPage === "page-booking") renderBookingPage();
    showPage();
  }

  ensureOverlays();

  const toothMenuOverlay = document.getElementById("tooth-menu-overlay");
  if (toothMenuOverlay) {
    toothMenuOverlay.addEventListener("click", function (event) {
      if (event.target === event.currentTarget || event.target.classList.contains("tooth-menu-backdrop")) {
        closeToothMenu();
      }
    });
  }

  window.navTo = navTo;
  window.goTo = goTo;
  window.goBack = goBack;
  window.setSelectedDate = setSelectedDate;
  window.shiftSelectedDate = shiftSelectedDate;
  window.updatePatientFilter = updatePatientFilter;
  window.openPatientProfile = openPatientProfile;
  window.setProfileTab = setProfileTab;
  window.setPatientFormField = setPatientFormField;
  window.savePatientInfo = savePatientInfo;
  window.openDentalPage = openDentalPage;
  window.focusToothRecord = focusToothRecord;
  window.startNewAppointment = startNewAppointment;
  window.startEditAppointment = startEditAppointment;
  window.deleteAppointment = deleteAppointment;
  window.saveAppointmentPayment = saveAppointmentPayment;
  window.setBookingField = setBookingField;
  window.setBookingDate = setBookingDate;
  window.changeBookingMonth = changeBookingMonth;
  window.openTimePicker = openTimePicker;
  window.closeTimePicker = closeTimePicker;
  window.setTimePickerPart = setTimePickerPart;
  window.applyTimePicker = applyTimePicker;
  window.saveBooking = saveBooking;
  window.openViewer = openViewer;
  window.closeViewer = closeViewer;
  window.deletePhoto = deletePhoto;
  window.closeToothMenu = closeToothMenu;
  window.saveToothAction = saveToothAction;
  window.saveCustomToothAction = saveCustomToothAction;
  window.deleteToothEntry = deleteToothEntry;
  window.closeConfirmDialog = closeConfirmDialog;
  window.approveConfirmDialog = approveConfirmDialog;
  window.toggleSettingsMenu = toggleSettingsMenu;
  window.setLanguage = setLanguage;

  async function bootstrapApp() {
    await loadPersistedData();
    state.profilePatientId = (appPatients[0] && appPatients[0].id) || null;
    applyLanguageDirection();
    refreshPages();
  }

  bootstrapApp();

  document.addEventListener("click", function (event) {
    if (!state.settingsOpen) return;
    const menu = document.querySelector(".settings-popover");
    const button = document.querySelector(".header-settings-btn");
    if ((menu && menu.contains(event.target)) || (button && button.contains(event.target))) return;
    closeSettingsMenu();
  });
})();


// Stable baseline snapshot
