// components/EntryForm.tsx
import { Button } from "@/components/ui/button";
import { Card } from '@/components/ui/card';
import React, { useState, useMemo, useCallback, useEffect  } from 'react';
import Select, { StylesConfig } from "react-select";
import { Phone, Mail, MapPin } from "lucide-react";
import { ActionMeta, SingleValue, MultiValue } from "react-select";



type OptionType = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

const jobOptions: OptionType[] = [
  { value: '', label: '希望職種を選択', isDisabled: true },
  { value: '営業スタッフ', label: '営業スタッフ' },
  { value: '事務スタッフ', label: '事務スタッフ' },
  { value: '施工スタッフ', label: '施工スタッフ' },
];


const EntryForm = () => {
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
  
  const [selectedJob, setSelectedJob] = useState<OptionType | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

  //   const handleJobChange = useCallback((selectedOption: OptionType | null) => {
  //     setSelectedJob(selectedOption);
  // }, []);
  const handleJobChange = useCallback(
  (selected: SingleValue<OptionType>, _actionMeta: ActionMeta<OptionType>) => {
    setSelectedJob(selected);
  },
  []
);

  // const validatedJobOptions = useMemo(() => {
  //   const jobOptions = [
  //       { value: '', label: '希望職種を選択', isDisabled: true },
  //       { value: '営業スタッフ', label: '営業スタッフ' },
  //       { value: '事務スタッフ', label: '事務スタッフ' },
  //       { value: '施工スタッフ', label: '施工スタッフ' },
  //   ];
  //   return jobOptions;
  //   }, []);

  // const handleJobChange = useCallback((selectedOption: OptionType | null) => { // useCallbackを使用
  //     setSelectedJob(selectedOption);
  // }, []);

  // const [selectedJob, setSelectedJob] = useState<OptionType | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (!selectedJob || !selectedJob.value) {
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
      body: JSON.stringify({ ...formData, jobType: selectedJob?.value }),
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
      setSelectedJob(null);
    } else {
      alert('メールの送信に失敗しました。');
    }
  };


  // const jobOptions = [
  //   { value: '', label: '希望職種を選択', isDisabled: true },
  //   { value: '営業スタッフ', label: '営業スタッフ' },
  //   { value: '事務スタッフ', label: '事務スタッフ' },
  //   { value: '施工スタッフ', label: '施工スタッフ' },
  // ];

  const customStyles: StylesConfig<OptionType> = {
    control: (provided) => ({
      ...provided,
      borderColor: errors.jobType ? 'red' : 'gray',
    }),
  };

  return (
    <div className="relative min-h-[93%]">
      <Card className="py-10 px-6">
        <h3 className="text-xl font-semibold mb-6">エントリーフォーム</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="nameInput"
              name="name"
              type="text"
              placeholder="お名前"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="お名前" 
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <input
              id="emailInput"
              name="email"
              type="email"
              placeholder="メールアドレス"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="メールアドレス" 
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <input
              id="phoneInput"
              name="phone"
              type="tel"
              placeholder="電話番号"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              aria-label="電話番号" 
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <div>
          {isClient && (
              <Select
                  isMulti={false}
                  placeholder="希望職種を選択"
                  options={jobOptions}
                  isOptionDisabled={(option: OptionType) => !!option.isDisabled}
                  styles={customStyles}
                  value={selectedJob}
                  id="jobType"
                  aria-label="希望職種を選択"
                  onChange={handleJobChange}
              />
          )}
            {errors.jobType && <p className="text-red-500">{errors.jobType}</p>}
          </div>
          <div>
            <textarea
              id="messageInput"
              name="message"
              placeholder="備考（任意）"
              value={formData.message}
              onChange={handleChange}
              className="w-full h-32 border border-gray-300 rounded-lg px-4 py-2"
              aria-label="備考（任意）"
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
      <Card className="p-6 bg-blue-500 text-primary-foreground mt-6 static md:absolute bottom-0 text-center w-full">
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

export default EntryForm;