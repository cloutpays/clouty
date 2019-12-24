import axios from 'axios';
import { Emoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Router from 'next/router';
import React, { useState } from 'react';

import colorways from '../lib/colorways';
interface Option {
  value: string;
  key: string;
}
interface CreateGameFormProps {
  title: string;
  options: Option[];
  description: string;
  emoji: string;
  slug: string;
  questions: string[];
}
const CreateGameForm: React.FC<CreateGameFormProps> = ({ questions }) => {
  const [description, setDescription] = useState<string>('');
  const [emoji, setEmoji] = useState<any>('smiley');
  const [option, setOption] = useState<string>('');
  const [options, setOptions] = useState<any[]>([]);

  const handleSubmit = async () => {
    const submission = {
      description,
      emoji: emoji.native,
      options,
      type: 'select',
      slug: (questions.length + 1).toString(),
      class: colorways[Math.floor(Math.random() * colorways.length)],
      question: questions.length + 1,
    };
    axios.post('/api/question', submission).then(() => {
      Router.push('/games');
    });
  };
  const addOption = () => {
    const updatedOptions = [
      { key: option, value: option },
      ...(true && options),
    ];

    setOptions(updatedOptions);
    setOption('');
  };
  const removeOption = (event: React.MouseEvent<HTMLElement>) => {
    const deleteIndex = event.currentTarget.getAttribute('data-option-index');
    const updatedOptions = [...options];
    updatedOptions.splice(Number(deleteIndex), 1);
    setOptions(updatedOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='dt mw9 center pv4 pv5-m pv6-ns'>
        <div className='dtc v-top'>
          <Emoji emoji={emoji} size={26} />
          <br />
          <Picker onSelect={(e) => setEmoji(e)} />
        </div>
        <div className='dtc v-top pl3'>
          <p className='lh-copy mv0'>Game #{questions.length + 1} </p>

          <div>
            <input
              className='black'
              value={description}
              placeholder='Enter question'
              onChange={(event) => setDescription(event.currentTarget.value)}
              required={true}
            />
          </div>

          <div>
            <input
              className='black'
              type='text'
              value={option}
              placeholder='Enter option'
              onChange={(event) => setOption(event.currentTarget.value)}
              required={true}
            />
          </div>
          <div>
            {options.map((opt, index) => {
              return (
                <div
                  data-option-index={index}
                  onClick={removeOption}
                  key={index}>
                  <h1 className='f4 mt0 fw7'>{opt.key}</h1>
                </div>
              );
            })}
          </div>
          <div>
            <span
              onClick={addOption}
              className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b noselect'>
              <span className='pl1 sans-serif'>{'Add option '}</span>
            </span>
          </div>
        </div>
      </div>

      <span
        onClick={handleSubmit}
        className='bg-white-30 pv1 ph2 f7 f6-ns br-pill b noselect'>
        <span className='pl1 sans-serif'>Submit </span>
      </span>
    </form>
  );
};
export default CreateGameForm;
