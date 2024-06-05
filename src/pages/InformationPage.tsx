import { FC } from "react";
import mapLogo from "../static/map.png";
import i18n from "../i18n";

const InformationPage: FC = () => {
  return (
    <div className="max-w-[962px] py-[77px] mx-auto mt-[95px] inter bg-bg-blue-design">
      <div className="mb-9">
        <h2 className="text-[32px]">{i18n.t('aboutPage.history')}</h2>
        <span>
          <p className="mb-1 text-[17px] font-medium">
          {i18n.t('aboutPage.history_text_1')}
          </p>
          <p className="mb-1 font-medium">
          {i18n.t('aboutPage.history_text_2')}
          </p>
          <p className="font-medium">
          {i18n.t('aboutPage.history_text_3')}
          </p>
        </span>
      </div>
      <div className="mb-9">
        <h2 className="text-[32px]">{i18n.t('aboutPage.university')}</h2>
        <span>
          <p className="mb-1 text-[17px] font-medium">
          {i18n.t('aboutPage.universityText_1')}
          </p>
          <p className="mb-1 font-medium">
          {i18n.t('aboutPage.universityText_2')}
          </p>
          <p className="mb-1 font-medium">
          {i18n.t('aboutPage.universityText_3')}
          </p>
          <p className="mb-1 font-medium">
          {i18n.t('aboutPage.universityText_4')}
          </p>
          <p className="mb-1 font-medium">
          {i18n.t('aboutPage.universityText_5')}
          </p>
          <p className="mb-1 font-medium">
          {i18n.t('aboutPage.universityText_6')}
          </p>
          <p className="font-medium">
          {i18n.t('aboutPage.universityText_7')}
          </p>
        </span>
      </div>
      <div className="mb-9">
        <h2 className="text-[32px]">{i18n.t('aboutPage.acadaemyUniversity')}</h2>
        <span>
          <p className="text-[17px] mb-9 font-medium">
            {i18n.t('aboutPage.acadaemyUniversityText_1')}
          </p>
          <div className="flex justify-center">
            <img src={mapLogo} className="w-[572px]" />
          </div>
        </span>
      </div>
      <div className="mb-9">
        <h2 className="text-[32px]">{i18n.t('aboutPage.geography')}</h2>
        <span>
          <p className="text-[17px] font-medium">
          {i18n.t('aboutPage.geographyText_1')}
          </p>
        </span>
      </div>
      <div className="mb-9">
        <h2 className="text-[32px]">{i18n.t('aboutPage.mission')}</h2>
        <span>
          <p className="text-[17px] mb-9 font-medium">
          {i18n.t('aboutPage.missionText_1')}
          </p>
        </span>
      </div>
      <div className="mb-9">
        <h2 className="text-[32px]">{i18n.t('aboutPage.vision')}</h2>
        <span>
          <p className="text-[17px] mb-9 font-medium">
          {i18n.t('aboutPage.visionText_1')}
          </p>
        </span>
      </div>
      <div>
        <h2 className="text-[32px]">{i18n.t('aboutPage.ourVision')}</h2>
        <span>
          <p className="text-[17px] mb-9">
            <ul className="list-disc ml-6 font-medium">
              <li>
              {i18n.t('aboutPage.ourVisionText_1')}
              </li>
              <li>
              {i18n.t('aboutPage.ourVisionText_2')}
              </li>
              <li>
              {i18n.t('aboutPage.ourVisionText_3')}
              </li>
              <li>
              {i18n.t('aboutPage.ourVisionText_4')}
              </li>
              <li>
              {i18n.t('aboutPage.ourVisionText_5')}
              </li>
              <li>
              {i18n.t('aboutPage.ourVisionText_6')}
              </li>
            </ul>
          </p>
        </span>
      </div>
    </div>
  );
};

export default InformationPage;
