// components/ContactForm.tsx
import { Button } from "@/components/ui/button";

import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
// import { Button } from 'react-day-picker';
import Select, { Props as SelectProps } from "react-select";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobType: '', // 希望職種を追加
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    jobType: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', email: '', phone: '', jobType: '' };

    if (!formData.name) {
      newErrors.name = 'お名前を入力してください';
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください';
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = '電話番号を入力してください';
      valid = false;
    }
    if (!formData.jobType) {
      newErrors.jobType = '希望職種を選択してください';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('メールが送信されました！');
      setFormData({
        name: '',
        email: '',
        phone: '',
        jobType: '',
        message: '',
      });
    } else {
      alert('メールの送信に失敗しました。');
    }
  };

  type OptionType = {
    value: string;
    label: string;
    isDisabled?: boolean;
  };

  const jobOptions = [
    { value: '', label: '希望職種を選択', isDisabled: true },
    { value: '営業スタッフ', label: '営業スタッフ' },
    { value: '事務スタッフ', label: '事務スタッフ' },
    { value: '施工スタッフ', label: '施工スタッフ' },
  ];


  return (
    <div className="relative min-h-[93%]">
    <Card className="py-10 px-6">
      <h3 className="text-xl font-semibold mb-6">エントリーフォーム</h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            type="text"
            placeholder="お名前"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="メールアドレス"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div>
          <input
            name="phone"
            type="tel"
            placeholder="電話番号"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
        <div>
          {/* <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="" disabled className='text-gray-400'>
              希望職種を選択
            </option>
            <option value="営業スタッフ">営業スタッフ</option>
            <option value="事務スタッフ">事務スタッフ</option>
            <option value="施工スタッフ">施工スタッフ</option>
          </select> */}
          {/* <Select
            options={jobOptions}
            placeholder="希望職種を選択"
            isOptionDisabled={(option) => !!option.isDisabled}
            styles={{
              placeholder: (base) => ({ ...base, color: '#a0aec0' }), // グレー
            }}
          /> */}
          <Select
  instanceId="job-select" // 一意のIDを指定
  options={jobOptions}
  placeholder="希望職種を選択"
  isOptionDisabled={(option) => !!option.isDisabled}
  styles={{
    placeholder: (base) => ({ ...base, color: '#a0aec0' }), // グレー
  }}
/>

          {errors.jobType && <p className="text-red-500">{errors.jobType}</p>}
        </div>
        <div>
          <textarea
            name="message"
            placeholder="備考（任意）"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-32 border border-gray-300 rounded-lg px-4 py-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
        >
          送信する
        </button>
      </form>
    </Card>
    <Card className="p-6 bg-blue-500 text-primary-foreground absolute bottom-0 text-center w-full">
              <h3 className="text-xl font-semibold mb-4">ご質問・ご相談</h3>
              <p className="mb-4">
                ご不明な点があれば、お電話にて 9:00~18:00 の間で受け付けております。<br />
                お気軽にお電話ください。
              </p>
              <Button variant="secondary" size="lg" className="w-full text-blue-500 text-2xl">
              <Phone className="ml-2 h-5 w-5 mr-1 text-blue-500" />052-934-7831
              </Button>
            </Card>
    </div>
  );
};

export default ContactForm;
