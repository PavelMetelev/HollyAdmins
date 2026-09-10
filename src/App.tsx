import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, Shield, Zap, Wand2 } from 'lucide-react';

const AHK_SCRIPT = `#Requires AutoHotkey v2.0
#SingleInstance Force

; Отключаем лишние предупреждения
#Warn All, Off

; --- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ---
global ScriptActive := true
global LV := "" 
global MyGui := ""

; --- ЦВЕТОВАЯ ПАЛИТРА ---
global ColorBG := "121212"
global ColorHeader := "1E88E5"
global ColorText := "FFFFFF"
global ColorSubText := "AAAAAA"
global ColorAccent := "2A2A2A"

; --- БАЗА ДАННЫХ ПРАВИЛ ---
global RulesDB := Map(
    "1.5",   {n: "Ник", p: "Бан навсегда (/nick ban 4d)", t: "ban", d: "4d", spec: "/nick ban 4d"},
    "2.1",   {n: "Гарант", p: "Бан 10 дней", t: "ban", d: "10d"},
    "2.2",   {n: "Передача", p: "Перманентный бан", t: "ban", d: "0d"},
    "2.3",   {n: "Взлом", p: "Бан по IP", t: "ban", d: "0d"},
    "2.4",   {n: "Читы", p: "Бан 30 дней по IP", t: "ban", d: "30d"},
    "2.4.1", {n: "Тим с читером", p: "Бан 14 дней", t: "ban", d: "14d"},
    "2.4.2", {n: "Реклама читов", p: "Бан по IP", t: "ban", d: "0d"},
    "2.6",   {n: "Торговля за рубли", p: "Назначается админ.", t: "ban", d: "0d"},
    "2.7",   {n: "Подстрекательство", p: "Бан 7 дней", t: "ban", d: "7d"},
    "2.8",   {n: "Помеха админам", p: "Бан 5 дней", t: "ban", d: "5d"},
    "2.9",   {n: "Обход", p: "x2 по IP", t: "ban", d: "0d"},
    "2.10",  {n: "Краш сервера", p: "Бан 15 дней", t: "ban", d: "15d"},
    "2.11",  {n: "Помеха ютуберам", p: "Назначается админ.", t: "ban", d: "0d"},
    "2.13",  {n: "Скрывать баги", p: "Бан от 3 дней", t: "ban", d: "3d"},
    "2.14",  {n: "Казино", p: "1-пред, 2-бан 3д, 3-перма", t: "ban", d: "3d"},
    "2.15",  {n: "Докс", p: "Бан навсегда по IP", t: "ban", d: "0d"},
    "2.16",  {n: "Тим плюс", p: "Бан 7 дней", t: "ban", d: "7d"},
    "2.17",  {n: "Выдача за админа", p: "Бан 14 дней", t: "ban", d: "14d"},
    "3.1",   {n: "Реклама", p: "Бан от 14 дней", t: "ban", d: "14d"},
    "3.2",   {n: "Капс", p: "Мут 1 час", t: "mute", d: "1h"},
    "3.3",   {n: "Флуд", p: "Мут 1 час", t: "mute", d: "1h"},
    "3.4",   {n: "Оскорбление", p: "Мут 3 часа", t: "mute", d: "3h"},
    "3.5",   {n: "Оск КП", p: "Мут 10 часов", t: "mute", d: "10h"},
    "3.6",   {n: "Оск родных", p: "Мут 7 часов", t: "mute", d: "7h"},
    "3.7",   {n: "Организация флуда", p: "Мут 3 часа", t: "mute", d: "3h"},
    "3.8",   {n: "Сообщение 18+", p: "Мут 2 часа", t: "mute", d: "2h"},
    "3.9",   {n: "Ненависть к религии", p: "Мут 9 часов", t: "mute", d: "9h"},
    "3.10",  {n: "Угроза наказанием", p: "Мут 5 часов", t: "mute", d: "5h"},
    "3.11",  {n: "Флуд командами", p: "Бан 6 часов", t: "ban", d: "6h"},
    "3.12",  {n: "Помеха наказанию", p: "Мут 4 часа", t: "mute", d: "4h"},
    "3.13",  {n: "Заблуждение", p: "Мут 5 часов", t: "mute", d: "5h"},
    "4.1",   {n: "Пруфы на баны/муты", p: "Бан 7 дней", t: "ban", d: "7d"},
    "4.2",   {n: "Некоррект. нак.", p: "Бан 7 дней", t: "ban", d: "7d"},
    "4.3",   {n: "Команды не по назн.", p: "Бан 2 дня", t: "ban", d: "2d"},
    "4.4",   {n: "Имитация сообщ.", p: "Бан 4 дня", t: "ban", d: "4d"},
    "6.1",   {n: "Ложные репорты", p: "IP Мут (1ч - бессрочно)", t: "mute", d: "1h"},
    "6.2",   {n: "Репорты для выгоды", p: "Бан от 1 до 14 дней", t: "ban", d: "14d"},
    "6.4",   {n: "Нарушение в репорте", p: "Бан 2 дня", t: "ban", d: "2d"}
)

; --- ГОРЯЧИЕ КЛАВИШИ ---

F1:: {
    global ScriptActive := !ScriptActive
    ToolTip(ScriptActive ? "🛡️ Режим АДМИНА: ВКЛ" : "👤 Режим ИГРОКА: ВЫКЛ")
    SetTimer(() => ToolTip(), -2000)
}

End::ExitApp()

F2:: {
    global LV, MyGui
    MyGui := Gui("-Caption +Border +AlwaysOnTop", "AdminRules")
    MyGui.BackColor := ColorBG

    MyGui.SetFont("s12 w700", "Segoe UI")
    MyGui.Add("Progress", "x0 y0 w620 h40 Background" . ColorHeader, 0)
    MyGui.Add("Text", "x20 y10 w580 h30 BackgroundTrans c" . ColorText . " Center", "🛡️ СПРАВОЧНИК ПРАВИЛ СЕРВЕРА")
    MyGui.Add("Text", "x600 y7 w20 h30 BackgroundTrans c" . ColorText . " Center", "X")

    MyGui.SetFont("s9 w400", "Segoe UI")
    MyGui.Add("Text", "x0 y50 w620 h20 BackgroundTrans c" . ColorSubText . " Center", "Используйте R для выдачи наказания или ' unm' для размута")

    MyGui.Add("Progress", "x15 y75 w600 h460 Background" . ColorAccent, 0)
    MyGui.SetFont("s10", "Segoe UI")
    
    LV := MyGui.Add("ListView", "x20 y80 w590 r21 Grid", ["Правило", "Нарушение", "Наказание"])

    for ruleNum, data in RulesDB {
        LV.Add(, ruleNum, data.n, data.p)
    }

    LV.ModifyCol(1, 80), LV.ModifyCol(2, 240), LV.ModifyCol(3, 310)
    MyGui.Show("w620 h550")

    OnMessage(0x0201, (wParam, lParam, msg, hwnd) => WM_LBUTTONDOWN(MyGui, wParam, lParam, msg, hwnd))
}

; ПЕРЕТАСКИВАНИЕ И ЗАКРЫТИЕ
WM_LBUTTONDOWN(GuiObj, wParam, lParam, msg, hwnd) {
    CoordMode "Mouse", "Window"
    MouseGetPos(&MouseX, &MouseY)
    if (MouseX > 590 && MouseY < 40) {
        GuiObj.Destroy()
        global LV := "", MyGui := ""
        return
    }
    if (MouseY < 45) {
        PostMessage(0xA1, 2,,, "A")
    }
}

; --- БРОНЕБОЙНЫЙ СКРОЛЛ ---
#HotIf WinActive("AdminRules")
WheelUp:: {
    if (LV != "")
        SendMessage(0x115, 0, 0, LV.Hwnd) ; SB_LINEUP
}
WheelDown:: {
    if (LV != "")
        SendMessage(0x115, 1, 0, LV.Hwnd) ; SB_LINEDOWN
}
#HotIf

; --- ЛОГИКА R ---
#HotIf ScriptActive
r:: {
    OldClipboard := A_Clipboard
    A_Clipboard := "" 
    Send("^a^c")
    if !ClipWait(0.3) {
        A_Clipboard := OldClipboard
        return
    }

    inputText := Trim(A_Clipboard)
    inputText := StrReplace(inputText, "'", ".") 

    ; 1. ПРОВЕРКА НА UNMUTE (если текст заканчивается на " unm")
    if RegExMatch(inputText, "i)\\s+unm$", &match) {
        ; Отрезаем " unm" с конца, чтобы получить только ник
        nickname := Trim(SubStr(inputText, 1, -4)) 
        
        Send("{BackSpace}")
        Sleep(50)
        Send("/unmute " . nickname . "{Enter}")
        
        A_Clipboard := OldClipboard
        return
    }

    ; 2. ПРОВЕРКА НА ПРАВИЛА (старая логика)
    if RegExMatch(inputText, "(\\d+(?:\\.\\d+)+)$", &match) {
        ruleNum := match[0]
        nickname := Trim(StrReplace(inputText, ruleNum, ""))
        
        if RulesDB.Has(ruleNum) {
            rule := RulesDB[ruleNum]
            if (rule.HasProp("spec")) {
                cmd := rule.spec . " " . ruleNum
            } else {
                typeCmd := (rule.t = "mute") ? "/tempmute" : "/tempban"
                cmd := typeCmd . " " . nickname . " " . rule.d . " " . ruleNum . " -s"
            }
            Send("{BackSpace}")
            Sleep(50)
            Send(cmd . "{Enter}")
        }
    }
    A_Clipboard := OldClipboard
}
#HotIf`;

const Particle = ({ color }: { color: string }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDuration = 10 + Math.random() * 20;
  const randomDelay = Math.random() * 10;
  const size = 2 + Math.random() * 4;

  return (
    <motion.div
      initial={{ opacity: 0, x: `${randomX}%`, y: `${randomY}%` }}
      animate={{ 
        opacity: [0, 0.8, 0],
        y: [`${randomY}%`, `${randomY - 20}%`],
        scale: [0, 1, 0]
      }}
      transition={{ 
        duration: randomDuration, 
        repeat: Infinity, 
        delay: randomDelay,
        ease: "linear" 
      }}
      className="absolute rounded-full blur-sm pointer-events-none"
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}`
      }}
    />
  );
};

export default function App() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Magical transition delay before redirecting
    setTimeout(() => {
      window.open('https://disk.yandex.ru/i/IYHx0K4VJqYlLw', '_blank');
      setIsDownloading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden relative flex items-center justify-center font-sans">
      {/* Background Magical Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/30 rounded-full blur-[120px] animate-pulse" />
        
        {[...Array(40)].map((_, i) => (
          <Particle key={i} color={i % 2 === 0 ? '#c084fc' : '#818cf8'} />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl w-full px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8 inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 backdrop-blur-xl"
        >
          <Wand2 className="w-12 h-12 text-purple-400 animate-bounce" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-400 animate-gradient-x"
          style={{
            backgroundImage: 'linear-gradient(to right, #c084fc, #a5b4fc, #c084fc)',
            backgroundSize: '200% auto'
          }}
        >
          Админ Помощник
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-indigo-200/70 mb-12 leading-relaxed"
        >
          Раскрой истинную силу управления сервером с помощью древних заклинаний автоматизации. <br />
          Мгновенные наказания, удобный справочник и магический интерфейс.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={isDownloading}
            className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-xl flex items-center gap-3 overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            {isDownloading ? (
              <>
                <Sparkles className="w-6 h-6 animate-spin" />
                <span>Заклинание творится...</span>
              </>
            ) : (
              <>
                <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
                <span>Скачать Скрипт (.ahk)</span>
              </>
            )}
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {[
              { icon: <Shield className="w-5 h-5" />, text: "Безопасно", color: "text-blue-400" },
              { icon: <Zap className="w-5 h-5" />, text: "Мгновенно", color: "text-yellow-400" },
              { icon: <Sparkles className="w-5 h-5" />, text: "Магически", color: "text-purple-400" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.2 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-indigo-200/60"
              >
                <span className={feature.color}>{feature.icon}</span>
                {feature.text}
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-16 p-8 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-md text-left w-full max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300">
                Управление и функционал
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              {[
                { key: "F1", desc: "Включить/выключить режим администратора" },
                { key: "R", desc: "Автоматически выдать наказание" },
                { key: "F2", desc: "Открыть правила сервера" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <span className="px-3 py-1 rounded-md bg-purple-600/30 border border-purple-400/50 text-purple-200 font-mono font-bold text-sm group-hover:bg-purple-600/50 transition-colors">
                    {item.key}
                  </span>
                  <span className="text-indigo-100/80">{item.desc}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
              <p className="text-sm font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Пример использования:
              </p>
              <div className="space-y-3">
                <p className="text-sm text-indigo-100/60 italic leading-relaxed">
                  Введите <span className="text-indigo-300 font-semibold">Ник</span>, затем <span className="text-indigo-300 font-semibold">пункт правил</span>, и нажмите клавишу <span className="text-indigo-300 font-semibold">R</span> (при включенном режиме администратора <span className="text-indigo-300 font-semibold">F1</span>).
                </p>
                <p className="text-xs text-red-400 font-medium">
                  ⚠️ Примечание: Ник и пункт правила должны быть написаны раздельно!
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-indigo-300/50">Пример:</span>
                  <code className="px-2 py-1 rounded bg-white/10 text-indigo-200 font-mono border border-white/10">
                    Player 3.3
                  </code>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
