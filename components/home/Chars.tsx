import { Fragment } from 'react';

/**
 * Splits text into words and letters so HomeMotion can animate each letter.
 * Screen readers get the plain text once; the letters are hidden from them.
 */
export default function Chars({ lines }: { lines: string[] }) {
  return (
    <>
      <span className="sr-only">{lines.join(' ')}</span>
      <span aria-hidden="true">
        {lines.map((line, l) => (
          <span key={l} className="skh-line">
            {line.split(' ').map((word, w) => (
              <Fragment key={w}>
                {w > 0 && ' '}
                <span className="skh-word">
                  {Array.from(word).map((char, c) => <span key={c} className="skh-char">{char}</span>)}
                </span>
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </>
  );
}
