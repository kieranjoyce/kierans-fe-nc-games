import { useState } from "react";
import styles from "../modules/VoteBlock.module.css";
import { ReactComponent as UpSymbol } from "../assets/arrow_upward_FILL0_wght400_GRAD0_opsz48.svg";
import { ReactComponent as DownSymbol } from "../assets/arrow_downward_FILL0_wght400_GRAD0_opsz48.svg";
import { patchVotes } from "../utils/api";

interface VoteBlockProps {
    votes: number;
    review_id: string;
    setIsErr: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VoteBlock({
    votes,
    review_id,
    setIsErr,
}: VoteBlockProps) {
    const [voteChange, setVoteChange] = useState<number>(0);

    const changeVote = (voteNum: number) => {
        const prevVote = voteChange;
        const voteNumAdjusted = prevVote !== voteNum ? voteNum : 0;
        setVoteChange(voteNumAdjusted);

        const isVoteSwapping =
            (voteNumAdjusted === 1 && prevVote === -1) ||
            (voteNumAdjusted === -1 && prevVote === 1);

        let votesToPatch;

        if (isVoteSwapping) {
            votesToPatch = 2 * voteNumAdjusted;
        } else if (voteNumAdjusted !== 0) {
            votesToPatch = voteNumAdjusted;
        } else {
            votesToPatch = prevVote === 1 ? -1 : 1;
        }

        patchVotes(review_id, votesToPatch).catch(() => {
            setIsErr(true);
        });
    };

    return (
        <div className={styles.voteBlock}>
            <button
                type="button"
                onClick={() => {
                    changeVote(1);
                }}
            >
                <UpSymbol
                    className={
                        voteChange === 1
                            ? styles.upSymbolSelected
                            : styles.symbolsUnselected
                    }
                />
            </button>
            <p>{votes + voteChange}</p>
            <button
                type="button"
                onClick={() => {
                    changeVote(-1);
                }}
            >
                <DownSymbol
                    className={
                        voteChange === -1
                            ? styles.downSymbolSelected
                            : styles.symbolsUnselected
                    }
                />
            </button>
        </div>
    );
}
