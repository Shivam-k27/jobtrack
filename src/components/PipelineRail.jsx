import { Check, X } from 'lucide-react';
import { PIPELINE_STEPS } from '../data/constants';
import './PipelineRail.css';

const SHORT_LABEL = {
  Applied: 'Applied',
  'Online Assessment': 'OA',
  Interview: 'Interview',
  Selected: 'Selected',
};

/**
 * Renders the placement journey as a connected-node rail.
 * `status` drives how far along the rail is filled; a Rejected
 * status renders the rail as a stalled branch with a red marker,
 * since the exact stage of rejection isn't tracked.
 */
export default function PipelineRail({ status, orientation = 'horizontal', dense = false }) {
  const isRejected = status === 'Rejected';
  const activeIndex = isRejected ? -1 : PIPELINE_STEPS.indexOf(status);

  return (
    <div
      className={`rail rail-${orientation} ${dense ? 'rail-dense' : ''} ${isRejected ? 'rail-rejected' : ''}`}
      role="img"
      aria-label={`Application status: ${status}`}
    >
      {PIPELINE_STEPS.map((step, i) => {
        const isDone = !isRejected && i < activeIndex;
        const isCurrent = !isRejected && i === activeIndex;
        const isFuture = isRejected || i > activeIndex;

        return (
          <div className="rail-step" key={step}>
            <div className="rail-node-wrap">
              <span
                className={`rail-node ${isDone ? 'rail-node-done' : ''} ${
                  isCurrent ? 'rail-node-current' : ''
                } ${isFuture ? 'rail-node-future' : ''}`}
              >
                {isDone ? <Check size={dense ? 10 : 12} strokeWidth={3} /> : null}
              </span>
              {i < PIPELINE_STEPS.length - 1 && (
                <span className={`rail-line ${isDone ? 'rail-line-done' : ''}`} />
              )}
            </div>
            {!dense && <span className="rail-label">{SHORT_LABEL[step]}</span>}
          </div>
        );
      })}
      {isRejected && (
        <div className="rail-step rail-step-end">
          <div className="rail-node-wrap">
            <span className="rail-line rail-line-rejected" />
            <span className="rail-node rail-node-rejected">
              <X size={dense ? 10 : 12} strokeWidth={3} />
            </span>
          </div>
          {!dense && <span className="rail-label rail-label-rejected">Rejected</span>}
        </div>
      )}
    </div>
  );
}
