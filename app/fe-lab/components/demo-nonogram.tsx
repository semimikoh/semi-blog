'use client';

import { useState, useCallback, useRef, Fragment } from 'react';

const SIZE = 30;

const GRID: (0 | 1)[][] = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0,
  ],
  [
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
];

const COLORS: string[][] = [
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#9e937b',
    '#ada490',
    '#9e927a',
    '#9f967e',
    '#a29d8c',
    '#626159',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#bcb196',
    '#dccca8',
    '#fcebc4',
    '#f9e1b3',
    '#feecc3',
    '#fff4d1',
    '#feedc5',
    '#f3e6c1',
    '#e7d3aa',
    '#9b8c70',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#baaa89',
    '#feeac0',
    '#faecc8',
    '#fbf0d2',
    '#f7e9c8',
    '#f2ddb1',
    '#f5e5be',
    '#f5e6c1',
    '#fbefce',
    '#f8e8c2',
    '#fdefca',
    '#ded0b1',
    '#857d6b',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '#7d715d',
    '#d2c4a4',
    '#fbebc5',
    '#faecc9',
    '#f7e9c5',
    '#fbefd0',
    '#fcf2d6',
    '#f7e8c3',
    '#f6e5be',
    '#fcf1d1',
    '#fbf0d3',
    '#f8eccd',
    '#f8e8c2',
    '#faecc8',
    '#e9dbb8',
    '#c0b293',
    '#958a70',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '#bbb198',
    '#fcebc5',
    '#f6e3ba',
    '#fde6b9',
    '#f2cd9b',
    '#ebc795',
    '#f5ddae',
    '#f2d8a7',
    '#f5e1b6',
    '#f6e6c0',
    '#f1d2a1',
    '#f5d7a9',
    '#f8e6be',
    '#efd4a5',
    '#eccb99',
    '#f7deaf',
    '#f2daad',
    '#9e937e',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '#746c60',
    '#ebdfbd',
    '#f7e7c0',
    '#ebca97',
    '#a17a54',
    '#a16f47',
    '#ce915d',
    '#edc896',
    '#f0cf9c',
    '#edc893',
    '#eec996',
    '#d19a66',
    '#bb8b5c',
    '#eece9f',
    '#f6deb0',
    '#e3bb85',
    '#f5dcae',
    '#f7e1b3',
    '#d3bb92',
    '#6e6556',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '#776e5a',
    '#c8b189',
    '#f5e5c2',
    '#f9e1b3',
    '#826445',
    '#0c0c13',
    '#2b2c31',
    '#714a2d',
    '#e9b276',
    '#eebd83',
    '#e9b67c',
    '#d9a56b',
    '#4c382a',
    '#474648',
    '#56422e',
    '#ebc691',
    '#ebc893',
    '#efc78b',
    '#fadfaa',
    '#efd4a3',
    '#ae9973',
    '#363430',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '#595447',
    '#c9ae82',
    '#edce9c',
    '#f5e5c3',
    '#dbb98c',
    '#4b4137',
    '#514e46',
    '#796e5b',
    '#c7b28d',
    '#c8b492',
    '#a89c83',
    '#c3b596',
    '#e3cca0',
    '#5b5041',
    '#2a2826',
    '#2a2a2c',
    '#b18a5f',
    '#fae3b4',
    '#edc990',
    '#f2cc8f',
    '#f3d197',
    '#e6c997',
    '#a79471',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '#ab9067',
    '#ebc387',
    '#e5c089',
    '#dbb889',
    '#c5a37d',
    '#ceba98',
    '#feedc4',
    '#fff2c5',
    '#bdab86',
    '#211e1b',
    '#23272f',
    '#272b31',
    '#847e6d',
    '#f9e6bd',
    '#ebdfbe',
    '#b6ab92',
    '#b39370',
    '#eccc9c',
    '#d2a46d',
    '#ddaf72',
    '#f3cc8d',
    '#efca8d',
    '#efc78b',
    '#a48f6b',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '#7a6e56',
    '#f6d296',
    '#edc88e',
    '#cd9e67',
    '#e7cfa8',
    '#f9e8c1',
    '#ebc38d',
    '#efcd98',
    '#fce3ae',
    '#b29d77',
    '#1b1a1a',
    '#111319',
    '#0a0b10',
    '#332e28',
    '#e8d5ad',
    '#fcedc6',
    '#fce8bc',
    '#f9e7c0',
    '#ebce9e',
    '#d6aa71',
    '#deaf70',
    '#ddab6b',
    '#e9bd7d',
    '#e2b373',
    '#9b835d',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '#957e57',
    '#f5cc8b',
    '#e3b577',
    '#c29361',
    '#e4cda6',
    '#ebca9a',
    '#dfac70',
    '#ebbf83',
    '#f8daa5',
    '#ecd5a5',
    '#6b6252',
    '#0e0e12',
    '#36322e',
    '#c2af8c',
    '#fae5b8',
    '#f6dfb1',
    '#f7e2b5',
    '#f3dcb0',
    '#e1c599',
    '#d4b07f',
    '#d29b5c',
    '#b77840',
    '#d1995a',
    '#eabb7b',
    '#796a50',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '#a38761',
    '#e5b576',
    '#d7a568',
    '#a87240',
    '#cead84',
    '#e7c699',
    '#edcb9d',
    '#efc58b',
    '#eaba7d',
    '#cfad7e',
    '#827359',
    '#2f2b25',
    '#6b604d',
    '#cbac81',
    '#f2d19b',
    '#f5daa7',
    '#f6ddac',
    '#fbecc6',
    '#e6d3af',
    '#bd986c',
    '#c89863',
    '#b97b45',
    '#bd814c',
    '#9f845e',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '#493b2c',
    '#a47e54',
    '#be8c59',
    '#8d5d35',
    '#a68a67',
    '#dfc298',
    '#e7c799',
    '#d9a46a',
    '#ad6e3b',
    '#4e3727',
    '#2b2e33',
    '#313338',
    '#3a3b3c',
    '#493526',
    '#b67d49',
    '#e3b479',
    '#efca8f',
    '#fbe6ba',
    '#e2cda8',
    '#a27750',
    '#9e6c42',
    '#ad7649',
    '#765337',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '#574634',
    '#43382c',
    '#5a4936',
    '#c2a67f',
    '#d3b388',
    '#b98353',
    '#8c552e',
    '#826952',
    '#968f82',
    '#9a9080',
    '#978b79',
    '#a08f75',
    '#9e693d',
    '#d0975d',
    '#ebc58f',
    '#d8b788',
    '#a1805b',
    '#ba986d',
    '#554534',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#76634c',
    '#b69871',
    '#b48e67',
    '#aa815a',
    '#b59169',
    '#b89870',
    '#cbae86',
    '#c7a77d',
    '#cda97c',
    '#bb8453',
    '#b37948',
    '#c29b6f',
    '#a2825c',
    '#c5a67b',
    '#cdb78e',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#816d54',
    '#b5936c',
    '#b6946f',
    '#ae8963',
    '#a37954',
    '#aa835e',
    '#b38c65',
    '#ae835b',
    '#a3724b',
    '#9a6742',
    '#9a6d46',
    '#d3b385',
    '#f7dca8',
    '#948262',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#70604b',
    '#c2a27a',
    '#af8661',
    '#a77a55',
    '#a97f5a',
    '#a97d58',
    '#a27551',
    '#a57a55',
    '#bb946e',
    '#be9368',
    '#dcb686',
    '#e6be84',
    '#e5b983',
    '#7e6856',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#6e4a35',
    '#a2714d',
    '#b88d66',
    '#b68961',
    '#b88a62',
    '#b2855d',
    '#c59f74',
    '#e3c599',
    '#dab280',
    '#dbaf77',
    '#c98f60',
    '#eaa28e',
    '#b57d77',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#77383c',
    '#bf6c62',
    '#9a5f43',
    '#a7724d',
    '#b7895f',
    '#b98a5e',
    '#b7875b',
    '#b78254',
    '#bf8c5b',
    '#be835f',
    '#e5a698',
    '#f59b95',
    '#f6b2a0',
    '#80765f',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#a55155',
    '#da7376',
    '#de8d89',
    '#c88a7d',
    '#bc816f',
    '#bd8873',
    '#b9806c',
    '#bd846e',
    '#d18d7f',
    '#ef9a95',
    '#ec8483',
    '#ee8c89',
    '#f6a995',
    '#e5cb8a',
    '#7c7251',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#5b3f31',
    '#cd736f',
    '#d16c70',
    '#d67175',
    '#de7c7f',
    '#e27f82',
    '#df7c80',
    '#e27f82',
    '#e78385',
    '#f08e8d',
    '#ed8987',
    '#ee8f8c',
    '#f8a7a2',
    '#eb9d60',
    '#ffd860',
    '#ead38d',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#8d7954',
    '#c99773',
    '#e38280',
    '#e07b7d',
    '#d46e72',
    '#d77477',
    '#e28485',
    '#e28182',
    '#e78787',
    '#ef9390',
    '#f69a95',
    '#faa19a',
    '#eea38e',
    '#f8c25a',
    '#f7bd37',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '#c07467',
    '#c26467',
    '#d07072',
    '#db787a',
    '#e17f80',
    '#e47e7f',
    '#e47e7f',
    '#e48583',
    '#e5807d',
    '#cc776b',
    '#e2c289',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
];

// Generate hints from the solution grid
function generateHints(grid: (0 | 1)[][]): {
  rowHints: number[][];
  colHints: number[][];
} {
  const rowHints: number[][] = [];
  const colHints: number[][] = [];

  for (let y = 0; y < SIZE; y++) {
    const hints: number[] = [];
    let count = 0;
    for (let x = 0; x < SIZE; x++) {
      if (grid[y][x] === 1) {
        count++;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    }
    if (count > 0) hints.push(count);
    rowHints.push(hints.length > 0 ? hints : [0]);
  }

  for (let x = 0; x < SIZE; x++) {
    const hints: number[] = [];
    let count = 0;
    for (let y = 0; y < SIZE; y++) {
      if (grid[y][x] === 1) {
        count++;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    }
    if (count > 0) hints.push(count);
    colHints.push(hints.length > 0 ? hints : [0]);
  }

  return { rowHints, colHints };
}

const { rowHints, colHints } = generateHints(GRID);
const maxRowHintLen = Math.max(...rowHints.map((h) => h.length));
const maxColHintLen = Math.max(...colHints.map((h) => h.length));

type CellState = 0 | 1 | 2; // 0=empty, 1=filled, 2=marked-X

export function DemoNonogram() {
  const [cells, setCells] = useState<CellState[][]>(() =>
    Array.from({ length: SIZE }, () => Array(SIZE).fill(0) as CellState[]),
  );
  const [solved, setSolved] = useState(false);
  const [solvedRows, setSolvedRows] = useState<Set<number>>(new Set());
  const [message, setMessage] = useState('');
  const [dragMode, setDragMode] = useState<CellState | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const touchStartCell = useRef<{ y: number; x: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const checkSolvedRows = useCallback((grid: CellState[][]) => {
    const newSolved = new Set<number>();
    for (let y = 0; y < SIZE; y++) {
      const rowCorrect = GRID[y].every(
        (val, x) => (grid[y][x] === 1) === (val === 1),
      );
      if (rowCorrect) newSolved.add(y);
    }
    setSolvedRows(newSolved);
  }, []);

  const toggleCell = useCallback(
    (y: number, x: number, rightClick: boolean) => {
      if (solved) return;
      setCells((prev) => {
        const next = prev.map((r) => [...r]);
        if (rightClick) {
          next[y][x] = next[y][x] === 2 ? 0 : 2;
        } else {
          next[y][x] = next[y][x] === 1 ? 0 : 1;
        }
        checkSolvedRows(next);
        return next;
      });
    },
    [solved, checkSolvedRows],
  );

  const setCell = useCallback(
    (y: number, x: number, value: CellState) => {
      if (solved) return;
      setCells((prev) => {
        const next = prev.map((r) => [...r]);
        next[y][x] = value;
        checkSolvedRows(next);
        return next;
      });
    },
    [solved, checkSolvedRows],
  );

  const handleCheck = useCallback(() => {
    const isCorrect = GRID.every((row, y) =>
      row.every((val, x) => (cells[y][x] === 1) === (val === 1)),
    );
    if (isCorrect) {
      setSolved(true);
      setMessage('정답입니다!');
    } else {
      setMessage('아직 틀린 부분이 있어요.');
      setTimeout(() => setMessage(''), 2000);
    }
  }, [cells]);

  const handleReset = useCallback(() => {
    setCells(
      Array.from({ length: SIZE }, () => Array(SIZE).fill(0) as CellState[]),
    );
    setSolved(false);
    setSolvedRows(new Set());
    setMessage('');
  }, []);

  const handleAutoSolve = useCallback(() => {
    const grid = GRID.map((row) => [...row]) as CellState[][];
    setCells(grid);
    setSolvedRows(new Set(Array.from({ length: SIZE }, (_, i) => i)));
    setSolved(true);
    setMessage('정답입니다!');
  }, []);

  const getCellFromTouch = useCallback(
    (touch: React.Touch | Touch): { y: number; x: number } | null => {
      if (!gridRef.current) return null;
      const cellElements = gridRef.current.querySelectorAll('[data-cell]');
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!el) return null;
      const cellEl = el.closest('[data-cell]');
      if (!cellEl || !cellElements.length) return null;
      const coord = (cellEl as HTMLElement).dataset.cell;
      if (!coord) return null;
      const [y, x] = coord.split(',').map(Number);
      return { y, x };
    },
    [],
  );

  // Cell size for responsive layout
  const CELL_PX = 14;
  const HINT_COL_W = maxRowHintLen * 18;

  return (
    <div className="solid-borders flex flex-col gap-3" style={{ fontSize: 14 }}>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleCheck}
          className="border px-3 py-1 text-sm font-semibold transition-colors hover:bg-[var(--card)]"
          style={{ borderWidth: 1, color: 'var(--foreground)' }}
        >
          정답 확인
        </button>
        <button
          onClick={handleReset}
          className="border px-3 py-1 text-sm transition-colors hover:bg-[var(--card)]"
          style={{ borderWidth: 1, color: 'var(--muted)' }}
        >
          초기화
        </button>
        <button
          onClick={handleAutoSolve}
          className="border px-3 py-1 text-sm transition-colors hover:bg-[var(--card)]"
          style={{ borderWidth: 1, color: 'var(--muted)' }}
        >
          자동 풀기
        </button>
        {message && (
          <span
            className="text-sm font-semibold"
            style={{
              color: solved ? 'var(--green)' : '#ef4444',
            }}
          >
            {message}
          </span>
        )}
      </div>

      <p className="text-xs" style={{ color: 'var(--muted)' }}>
        클릭: 채우기 / 우클릭(또는 길게 누르기): X 표시
      </p>

      <div
        className="overflow-auto"
        style={{ maxWidth: '100%' }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          style={{
            display: 'inline-grid',
            gridTemplateColumns: `${HINT_COL_W}px repeat(${SIZE}, ${CELL_PX}px)`,
            gridTemplateRows: `repeat(${maxColHintLen}, 16px) repeat(${SIZE}, ${CELL_PX}px)`,
            gap: 0,
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          ref={gridRef}
          onMouseDown={(e) => {
            const target = e.target as HTMLElement;
            const cellEl = target.closest('[data-cell]') as HTMLElement | null;
            if (!cellEl) return;
            const [y, x] = cellEl.dataset.cell!.split(',').map(Number);
            if (e.button === 2) {
              toggleCell(y, x, true);
              setDragMode(cells[y][x] === 2 ? 0 : 2);
            } else {
              toggleCell(y, x, false);
              setDragMode(cells[y][x] === 1 ? 0 : 1);
            }
          }}
          onMouseMove={(e) => {
            if (dragMode === null) return;
            const target = e.target as HTMLElement;
            const cellEl = target.closest('[data-cell]') as HTMLElement | null;
            if (!cellEl) return;
            const [y, x] = cellEl.dataset.cell!.split(',').map(Number);
            setCell(y, x, dragMode);
          }}
          onMouseUp={() => setDragMode(null)}
          onMouseLeave={() => setDragMode(null)}
          onTouchStart={(e) => {
            const cell = getCellFromTouch(e.touches[0]);
            if (!cell) return;
            e.preventDefault();
            isLongPress.current = false;
            touchStartCell.current = cell;
            longPressTimer.current = setTimeout(() => {
              isLongPress.current = true;
              toggleCell(cell.y, cell.x, true);
              setDragMode(cells[cell.y][cell.x] === 2 ? 0 : 2);
            }, 400);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            if (longPressTimer.current) {
              clearTimeout(longPressTimer.current);
              longPressTimer.current = null;
            }
            if (dragMode !== null) {
              const cell = getCellFromTouch(e.touches[0]);
              if (cell) setCell(cell.y, cell.x, dragMode);
            }
          }}
          onTouchEnd={() => {
            if (longPressTimer.current) {
              clearTimeout(longPressTimer.current);
              longPressTimer.current = null;
              // Short tap -> toggle fill
              const cell = touchStartCell.current;
              if (cell) toggleCell(cell.y, cell.x, false);
            }
            setDragMode(null);
            isLongPress.current = false;
            touchStartCell.current = null;
          }}
        >
          {/* Top-left corner spacer */}
          <div
            style={{
              gridColumn: '1',
              gridRow: `1 / ${maxColHintLen + 1}`,
            }}
          />

          {/* Column hints */}
          {Array.from({ length: SIZE }, (_, x) => {
            const hints = colHints[x];
            const padded = Array(maxColHintLen - hints.length)
              .fill('')
              .concat(hints);
            return padded.map((h, i) => (
              <div
                key={`ch-${x}-${i}`}
                style={{
                  gridColumn: x + 2,
                  gridRow: i + 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  lineHeight: '16px',
                  color: 'var(--muted)',
                  borderRight:
                    (x + 1) % 5 === 0 && x < SIZE - 1
                      ? '1px solid var(--border)'
                      : undefined,
                }}
              >
                {h !== '' ? h : ''}
              </div>
            ));
          })}

          {/* Rows */}
          {Array.from({ length: SIZE }, (_, y) => {
            const hints = rowHints[y];
            return (
              <Fragment key={y}>
                {/* Row hints */}
                <div
                  style={{
                    gridColumn: '1',
                    gridRow: y + maxColHintLen + 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 3,
                    paddingRight: 4,
                    fontSize: 9,
                    color: 'var(--muted)',
                    borderBottom:
                      (y + 1) % 5 === 0 && y < SIZE - 1
                        ? '1px solid var(--border)'
                        : undefined,
                  }}
                >
                  {hints.map((h, i) => (
                    <span key={i}>{h}</span>
                  ))}
                </div>

                {/* Grid cells */}
                {Array.from({ length: SIZE }, (_, x) => {
                  const state = cells[y][x];
                  const rowSolved = solvedRows.has(y);

                  let bg = 'var(--background)';
                  if (rowSolved && GRID[y][x] === 1 && COLORS[y][x]) {
                    bg = COLORS[y][x];
                  } else if (state === 1) {
                    bg = 'var(--foreground)';
                  }

                  return (
                    <div
                      key={`c-${y}-${x}`}
                      data-cell={`${y},${x}`}
                      style={{
                        gridColumn: x + 2,
                        gridRow: y + maxColHintLen + 1,
                        width: CELL_PX,
                        height: CELL_PX,
                        background: bg,
                        borderRight:
                          (x + 1) % 5 === 0 && x < SIZE - 1
                            ? '1px solid var(--border)'
                            : '1px solid var(--card)',
                        borderBottom:
                          (y + 1) % 5 === 0 && y < SIZE - 1
                            ? '1px solid var(--border)'
                            : '1px solid var(--card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: solved ? 'default' : 'pointer',
                        fontSize: 9,
                        color: 'var(--muted)',
                        transition: rowSolved ? 'background 0.3s' : undefined,
                      }}
                    >
                      {state === 2 && !solved ? '✕' : ''}
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
