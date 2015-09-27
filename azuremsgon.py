import sys
from azure.servicebus import ServiceBusService
from azure.servicebus import Message


def azure_autheticate():
    key_name = 'beardcavekey' # SharedAccessKeyName from Azure portal
    key_value = 'qc4xkJJlpEiRpcwCiD56dh/oxJBlhmM0gCwUcYw10GM=' # SharedAccessKey from Azure portal
    service_namespace = 'beardcave'
    sbs = ServiceBusService(service_namespace,
                            shared_access_key_name=key_name,
                            shared_access_key_value=key_value)

    print "authenticated"
    msg = Message('g3 on')
    sbs.send_topic_message('lighttopic', msg)
    # msg = sbs.receive_subscription_message('lighttopic', 'lightsubscription', peek_lock=True)
    print(msg.body)
    print "sent"

def say_hello():
    azure_autheticate()
    sys.stdout.write('Hello from Python script!')
    sys.stdout.flush()


if __name__ == "__main__":
    azure_autheticate()
