import "./FailMessage.style.scss";

type StrongLevel = {
  failMessage: string;
  strongLevel: number;
};

const StrongMessage: [string, string, string, string] = [
  "금지된 수준",
  "심각한 수준",
  "보통 수준",
  "강력한 암호",
];

const FailMessage: React.FC<StrongLevel> = ({ failMessage, strongLevel }) => {
  return (
    <div className={`FailMessage ${strongLevel > 0 ? "" : "fail"}`}>
      {strongLevel > 0 ? (
        <>
          {Array.from({ length: strongLevel }).map((_, index) => (
            <span key={index} className={`strong-level-checker strong-${index}`}>
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ))}
          {StrongMessage[strongLevel - 1]}
        </>
      ) : (
        <>{failMessage}</>
      )}
    </div>
  );
};

export default FailMessage;
