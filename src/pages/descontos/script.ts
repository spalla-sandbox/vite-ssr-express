import { sum } from '../../helpers/sum';
import { format } from 'date-fns'


window.onload = () => {
  console.log(sum(1, 2))
  console.log(format(new Date(), "'Today is a' eeee"))
}