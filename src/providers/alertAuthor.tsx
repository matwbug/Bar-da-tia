import { Button, Checkbox, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Snippet, useDisclosure } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { BsExclamationCircle, BsExclamationCircleFill } from "react-icons/bs";

export default function AlertAuthor({children}: {children: ReactNode}){
    const [hideValue, setHideValue] = useState<boolean>()
    const [modalOpen, setModal] = useState<boolean>()

    useEffect(() => {
        if(typeof window !== 'undefined'){
            let cachedValue = localStorage.getItem('hideAlert')
            
            if(cachedValue && cachedValue === 'hide'){
                setHideValue(true)
                setModal(false)
            }else{
                setHideValue(false)
                setModal(true)
            }
        }
    }, [])
    
    const handleChangeValueInput = (value: boolean) => {
        if (typeof window !== 'undefined') {
            if(value){
                localStorage.setItem('hideAlert', 'hide')
                setHideValue(true)
            }
            else{
                localStorage.setItem('hideAlert', 'nohide') 
                setHideValue(false)
            }
        }
    }

    return(<>
        <Modal
            size="5xl"
            isOpen={modalOpen} 
            onOpenChange={setModal}
            backdrop="opaque"
        >
            <ModalContent>
                <ModalHeader className="flex flex-row gap-1 items-center justify-center">
                    <p>Aviso Importante</p> 
                </ModalHeader>
                <ModalBody className="flex flex-col gap-2 pb-4">
                    <div className="flex flex-col gap-2">
                        <p> 
                        Bem-vindo ao site de qualificação para a vaga em Oak Tecnologias <br />
                        Este site faz parte do processo de seleção para uma vaga na Oak Tecnologias e foi desenvolvido por Matheus Motta. Instruções para utilizar as funcionalidades do site estarão abaixo. <br />
                        </p>
                        <span>Atenciosamente, Matheus Motta</span>
                    </div>
                    <div className="flex mt-2 flex-col">
                        <p>
                        Para adicionar produtos, desativá-los e editá-los, vá até o <Link href="/painel/">painel do administrador</Link> e utilize os dados abaixo para fazer login.
                        </p>
                        <div className="flex flex-col mt-2 items-start gap-2">
                            <div className="flex flex-col gap-1">
                                <p>Usuário</p>
                                <Snippet color="default" variant="flat">
                                admin
                                </Snippet>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>Senha</p>
                                <Snippet color="default" variant="flat">
                                admin1234
                                </Snippet>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-6 gap-2">
                        <Checkbox isSelected={hideValue} onValueChange={(e) => handleChangeValueInput(e)}>Não quero ver esse aviso novamente</Checkbox>
                        <Button onClick={() => setModal(false)} color="primary" variant="flat" fullWidth>Fechar</Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
        {children}
    </>)
}