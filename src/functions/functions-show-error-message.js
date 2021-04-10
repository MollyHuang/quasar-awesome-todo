// outside of a Vue file
import { Dialog, Loading } from 'quasar'

export function shwoErrorMessage(errorMessage) {
  Loading.hide()
  Dialog.create({
    title: 'Error',
    message: errorMessage
  })
}