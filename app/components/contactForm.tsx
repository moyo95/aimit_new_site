// components/ContactForm.tsx

import { Card } from '@/components/ui/card';
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', email: '', phone: '', message: '' };

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
    if (!formData.message) {
      newErrors.message = 'お問い合わせ内容を入力してください';
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
        message: '',
      });
    } else {
      alert('メールの送信に失敗しました。');
    }
  };

  return (
    <Card className="py-10 px-6">
              <h3 className="text-xl font-semibold mb-6">お問い合わせフォーム</h3>
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
        <textarea
          name="message"
          placeholder="お問い合わせ内容"
          value={formData.message}
          onChange={handleChange}
          className="w-full h-32 border border-gray-300 rounded-lg px-4 py-2"
        ></textarea>
        {errors.message && <p className="text-red-500">{errors.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
      >
        送信する
      </button>
    </form>
    </Card>
 );
};

export default ContactForm;
