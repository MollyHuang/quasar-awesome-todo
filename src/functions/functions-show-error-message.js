// outside of a Vue file
import { Dialog } from 'quasar'

export function shwoErrorMessage(errorMessage) {
  Dialog.create({
    title: 'Error',
    message: errorMessage
  })
}