"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitRequest } from "@/app/actions";
import { Loader2, Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  nickname: z.string().min(3, "Ник должен быть не менее 3 символов").max(50),
  role: z.enum(["Стажер", "Мл.сотрудник", "Сотрудник"]),
  contact: z.string().min(3, "Укажите способ связи (VK, Discord, TG)").max(100),
  captcha: z.string().min(1, "Введите капчу"),
});

export default function AdminForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaQ, setCaptchaQ] = useState({ q: "", a: "" });

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptchaQ({ q: `${a} + ${b} = ?`, a: (a + b).toString() });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      captcha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);

    const result = await submitRequest({
      ...values,
      expectedCaptcha: captchaQ.a,
    });

    if (result.success) {
      setSuccess(true);
      reset();
      generateCaptcha();
    } else {
      setError(result.error || "Что-то пошло не так");
      generateCaptcha();
    }
    setIsSubmitting(false);
  }

  if (success) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="text-green-600 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Запрос отправлен!</h2>
        <p className="text-gray-600 mb-6">Ваша заявка успешно отправлена администратору в Telegram.</p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Отправить еще
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">AHK Помощник</h2>
        <p className="text-gray-500 text-sm mt-1">Заполните форму для получения файла и инструкций</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ник на сервере</label>
          <input
            {...register("nickname")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
              errors.nickname ? "border-red-500" : "border-gray-300"
            )}
            placeholder="Ivan_Ivanov"
          />
          {errors.nickname && <p className="text-red-500 text-xs mt-1">{errors.nickname.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Способ связи</label>
          <input
            {...register("contact")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
              errors.contact ? "border-red-500" : "border-gray-300"
            )}
            placeholder="VK / Discord / Telegram"
          />
          {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
          <select
            {...register("role")}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none bg-white",
              errors.role ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Выберите должность</option>
            <option value="Стажер">Стажер</option>
            <option value="Мл.сотрудник">Мл.сотрудник</option>
            <option value="Сотрудник">Сотрудник</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Капча (анти-бот)</label>
          <div className="flex gap-2 items-center">
            <div className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-center font-mono font-bold text-gray-700 select-none">
              {captchaQ.q}
            </div>
            <button
              type="button"
              onClick={generateCaptcha}
              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <input
              {...register("captcha")}
              className={cn(
                "w-24 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all",
                errors.captcha ? "border-red-500" : "border-gray-300"
              )}
              placeholder="?"
            />
          </div>
          {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha.message}</p>}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Отправить запрос
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-gray-400">
        Ваши данные будут отправлены администратору в Telegram
      </p>
    </form>
  );
}
