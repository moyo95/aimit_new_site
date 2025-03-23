import React from 'react'
import Heros from "../components/Heros";
import heroData from "../../public/data/heroData.json";

export default function Privacy() {
  return (
    <>
    <Heros
    id={heroData.privacy.id}
    title={heroData.privacy.title}
    subtitle={heroData.privacy.subtitle}
    description={heroData.privacy.description}
    backgroundImage={heroData.privacy.backgroundImage}
    primaryButton={heroData.privacy.primaryButton}
    secondaryButton={heroData.privacy.secondaryButton}
     />
    <section id="privacy" className="py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 my-10 md:my-20">
        <div className="text-center mb=10 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">個人情報保護ご方針</h2>
          
        </div>
        
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-24">
          <ul>
            <li className='my-6 leading-loose'>
              <h3 className='text-xl my-3 font-bold'>01.情報の取得</h3>
              <p>当社は以下の種類の情報を収集する場合があります。</p>
              <ul className='my-6 pl-6 leading-loose'>
                <li>個人情報: 氏名、メールアドレス、電話番号など。</li>
                <li>利用情報: サービスの使用状況やアクセスログなど。</li>
                <li>クッキー情報: お客様のサイト利用状況に関するデータ。</li>
              </ul>
            </li>
            <li className='my-6 leading-loose'>
              <h3 className='text-xl my-3 font-bold'>02.情報の使用目的</h3>
              <p>当社は、個人情報を、下記の利用目的の範囲で、業務の遂行上必要な限りにおいて利用します。 
                当社は、個人情報を第三者との間で共同利用し、または、個人情報の取扱いを第三者に委託する場合には、
                当該第三者につき厳正な調査を行ったうえ、秘密を保持させるために、適正な監督を行います。
              </p>
              <ul className='my-6 pl-6 leading-loose'>
                <li>給湯機器等の設置及び修理に関わるサービスの提供</li>
                <li>リフォーム等の住まいに関する情報の提供</li>
                <li>アフターサービス、メンテナンスの提供</li>
                <li>ご意見、ご質問、ご要望への対応</li>
                <li>その他上記の4項目に附随する業務の実施</li>
              </ul>
            </li>
            <li className='my-6 leading-loose'>
              <h3  className='text-xl my-3 font-bold'>03.情報の共同利用に関して</h3>
              <p>当社は、以下の通り弊社が取り扱う商品の販売・保守等に関連してお客様から取得した個人情報を共同利用させていただきます。</p>
              <p>弊社ではご購入頂いた商品の配送に外部の運送会社を使用いたします。その為にお届け先情報の共同利用をします。
                弊社ではご購入頂いた商品の取付工事を、弊社指定工事店もしくはメーカー指定工事店に委託する場合があります。その際に工事店、メーカー等と個人情報を共同利用します。
                弊社でご購入いただいた商品を、分割払いでお支払いをご希望されるお客様の個人情報を、弊社と提携している信販会社と共同利用します。
                修理をご依頼いただいたお客様の個人情報をメーカーサービスと共同利用します。
                アフターサービスにおいて、ご購入いただいた商品のメーカー及びメーカーの指定する保証会社と個人情報を共同利用します。
              </p>
            </li>
            <li className='my-6 leading-loose'>
              <h3  className='text-xl my-3 font-bold'> 04.情報の第三者へ開示・提供</h3>
              <p>当社は、法令に定める場合を除き、個人情報を、事前に本人の同意を得ることなく、第三者に提供しません。</p>
              
            </li>
            <li className='my-6 leading-loose'>
              <h3 className='text-xl my-3 font-bold'> 05.情報の保護</h3>
              <p>*当社は、個人情報の正確性を保ち、これを安全に管理致します。 *当社は、個人情報の紛失、破壊、改ざん及び漏えいなどを防止するため、お客さまの個人情報への不正なアクセスや漏洩、滅失、毀損等を防止し、セキュリティの確保に努めます。
              </p>
            </li>
            <li className='my-6 leading-loose'>
              <h3 className='text-xl my-3 font-bold'> 06.情報の開示・修正・利用停止・削除について</h3>
              <p>当社は、本人が自己の個人情報について、開示・訂正・利用停止・消去等を求める権利を有していることを 確認し、
                これらの要求ある場合には、異議なく速やかに対応します。</p>
            </li>
            <li className='my-6 leading-loose'>
              <h3 className='text-xl my-3 font-bold'> 07.クッキーの使用</h3>
              <p>当社は、本人が自己の個人情報について、開示・訂正・利用停止・消去等を求める権利を有していることを 確認し、
                これらの要求ある場合には、異議なく速やかに対応します。</p>
            </li>
            <li className='my-6 leading-loose'>
              <h3 className='text-xl my-3 font-bold'> 08.情報の取り扱いに関するお問い合わせ先</h3>
              <p>プライバシーポリシーやお客様の情報に関するお問い合わせは、以下の連絡先までご連絡ください。</p>
              <ul className='my-6 pl-6 leading-loose'>
                  <li>[住所]愛知県名古屋市北区山田1丁目16-12</li>
                  <li>[電話]052-934-7831</li>
                  <li>[FAX]052-934-7831</li>
                  <li>[電子メール]info@aimit.jp</li>
                </ul>
              
        
        
        
            </li>
          </ul>

        
       
        

        
       
        

        

        

        
        
        </div>
    </div>
    </section>
    </>
    
  )
}
