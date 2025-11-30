import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import NiceModal, { useModal } from '@ebay/nice-modal-react';


type ConfirmModalProps = {
  title?: string;
  description?: string;
};

const ConfirmModal = NiceModal.create<ConfirmModalProps>(
  ({ title, description }: ConfirmModalProps) => {
    const modal = useModal();

    return (
      <Dialog open={modal.visible} onOpenChange={modal.hide}>
        <DialogContent className="w-[300px]  ">
          <DialogTitle hidden />
          <DialogDescription hidden />
          <div className="flex flex-col items-center justify-center gap-4 p-5">

            <div className="space-y-1 text-center">
              <p className="text-base">{title}</p>
              <p className="text-xs">{description}</p>
            </div>
          </div>
          <DialogFooter className="flex flex-row items-center justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => modal.hide()}>
              cancel
            </Button>
            <Button
              onClick={() => {
                modal.resolve(true)
                modal.hide();
              }}
            >
              confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);

export default ConfirmModal;
