import type { BaseTrainingSeminar } from '@training-needs/database'

export interface RankedSeminarWithPosition extends BaseTrainingSeminar {
  position: number
}
